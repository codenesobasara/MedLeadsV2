
const func = require("../GeneralFunctions")
const vendorFunc = require("../VendorServices/VendorFunctions")
const {VendorAnalyticsObject} = require("../VendorServices/VendorFunctions")




class BoothAnalytics{
  constructor(reps) {
      this.totalScans=0;
      this.avgScansPerRep=0;
      this.activeRepCount=0;
      this.peakDay={};
      this.peakDayHour={};
      this.questions=[];
      this.attendingReps=reps;
      this.allScans=[];
      this.BoothAttendees = []
      this.dayHourScans=[]; 
      this._activeRepMap = {}
      this._peakMap={}
      this._attendeeMap ={}          
  }

addScan(dayKey,hourKey,s,eventAttendees,scannedProducts,products){
   this.totalScans ++;
   this.allScans.push(s)
   let obj = this.dayHourScans.find(i => i.dayKey === dayKey);
   if (!obj) {obj = { dayKey, hours: {} };
  this.dayHourScans.push(obj);}
  obj.hours[hourKey] = (obj.hours[hourKey] ?? 0) + 1;
  this._activeRepMap[s.salesRepId] ||= { active: false, count: 0 };
  this._activeRepMap[s.salesRepId].count++;
  this._activeRepMap[s.salesRepId].active = true;
  const attendee = eventAttendees.find(a => a.id === s.attendeeId);
   if(attendee){
   this._attendeeMap[attendee.id]||={FirstName:attendee.firstName,lastName:attendee.LastName,npi:0,visits:0,scannedBy:{},products:{}}
   this._attendeeMap[attendee.id].visits++;
   const rep = this.attendingReps.find(r=> s.salesRepId === r.id)
   this._attendeeMap[attendee.id].scannedBy[rep.id] ||= `${rep.firstName} ${rep.lastName}`;
    const productRow = scannedProducts.find(p => s.id === p.scanId)
   if(productRow){const product = products.find(p=> p.id === productRow.productId);  this._attendeeMap[attendee.id].products[product.id] ||= product;
}
  }
  

}
addQuestions(questions){
this.questions = questions
}
sort() {
  const { byDay, byDayHour } = (() => {
    const scansByDay = this.dayHourScans.reduce((acc, obj) => {
      const dayTotal = Object.values(obj.hours).reduce((sum, n) => sum + n, 0);
      acc[obj.dayKey] = (acc[obj.dayKey] ?? 0) + dayTotal;
      return acc;
}, {});
    this.BoothAttendees = Object.values(this._attendeeMap)
    .sort((a, b) => b.visits - a.visits);

    const scansByDayHour = this.dayHourScans.reduce((acc, obj) => {
      acc[obj.dayKey] = obj.hours ?? {};
      return acc;
    }, {});

    const byDay = Object.entries(scansByDay)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => b.count - a.count);

    const byDayHour = Object.entries(scansByDayHour)
      .flatMap(([day, hoursObj]) =>
        Object.entries(hoursObj).map(([hour, count]) => ({ day, hour, count }))
      )
      .sort((a, b) => b.count - a.count);

    return { byDay, byDayHour };
  })();
  this.peakDay = byDay[0];         
  this.peakDayHour = byDayHour[0];
  return { byDay, byDayHour };
}

finalize(){
  const activeRepsAmount = Object.keys(this._activeRepMap).length;
  this.activeRepCount = activeRepsAmount;
  this.avgScansPerRep = this.totalScans / this.activeRepCount;
  this.BoothAttendees = Object.values(this._attendeeMap);
  console.log(this.BoothAttendees);
  
 
}


}


class RepAnalytics{
    constructor() {
    this.id = 0;
    this.name = ""
    this.totalScans = 0;
    this.totAvgScansPerHour = 0;
    this.avgScansPerDay = 0;
    this.scans = [];
    this.attendees = [];             
    this.scansPerDayHour = [];     
    this.avgScansPerDayHour = [];  
    this.peakDayHour = [];       
    this.isActive = false;
  }
  addScan(reps=[],scan,dayKey,hourKey,eventAttendees){
   const rep = reps.find(r =>scan.salesRepId === r.id )
   this.id = rep.id
   this.name = `${rep.firstName} ${rep.lastName}`;
   this.totalScans++
   this.isActive = true
   this.scans.push(scan)
    const attendeeObj = eventAttendees.find(a => a.id === scan.attendeeId);
  if (attendeeObj) {
    if (!this.attendees.some(a => a.id === attendeeObj.id)) {
      this.attendees.push(attendeeObj);
    }
  }
   let dayObj = this.scansPerDayHour.find(d => d.dayKey === dayKey);
    if (!dayObj) {
    dayObj = { dayKey, hours: {} };
    this.scansPerDayHour.push(dayObj);}
    dayObj.hours[hourKey] = (dayObj.hours[hourKey] ?? 0) + 1;}

    finalize(){
      const hourlyTotals ={}
      this.scansPerDayHour.forEach(obj =>{
       Object.entries(obj.hours).forEach(([hourKey,scancount])=>{
        hourlyTotals[hourKey]||=[]
        hourlyTotals[hourKey].push(scancount)
       })
      });
    this.avgScansPerDayHour = Object.entries(hourlyTotals).map(([hourKey, scans]) => {
    const sum = scans.reduce((a, b) => a + b, 0);
    const avg = sum / scans.length;
    return { [hourKey]: Number(avg.toFixed(2)) };
  });
this.scansPerDayHour.forEach(obj => {
  const hourEntries = Object.entries(obj.hours);
  if (!hourEntries.length) return;

  const busyTimes = hourEntries.reduce(
    (max, current) => (current[1] > max[1] ? current : max)
  );

  const busiestHour = busyTimes[0];
  const count = busyTimes[1];

  this.peakDayHour.push({
    [obj.dayKey]: { [busiestHour]: count }
  });
});
    }
  
  }

  function buildVendorAnalytics(data){
  const vendorAnalyticsObj = data.analyticsObject
  vendorAnalyticsObj.booth = new BoothAnalytics(data.reps)
  const repMap = {}
  data.eventScans.forEach(s => {
  const{dayKey,hourKey} = func.getDayHourKeys(s.scannedAt,data.event.timeZone)
  vendorAnalyticsObj.booth.addScan(dayKey,hourKey,s,data.eventAttendees,data.scannedProducts,data.products)
  const repId =s.salesRepId;
  if(!repId) return;
  repMap[repId]||= new RepAnalytics()
  repMap[repId].addScan(data.reps,s,dayKey,hourKey,data.eventAttendees)
  })
  vendorAnalyticsObj.booth.sort()
  vendorAnalyticsObj.booth.finalize()
   vendorAnalyticsObj.booth.addQuestions(data.questions);
  vendorAnalyticsObj.reps = Object.values(repMap)
  vendorAnalyticsObj.reps.forEach(r => r.finalize())
  return vendorAnalyticsObj

  }  

 




module.exports={BoothAnalytics,RepAnalytics,buildVendorAnalytics}