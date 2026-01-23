const { scan, count } = require("rxjs")
const {SalesRepAnalyticsObj} = require("../GeneralFunctions")
const func = require("../GeneralFunctions")
const vendorFunc = require("../VendorServices/VendorFunctions")
const {VendorAnalyticsObject} = require("../VendorServices/VendorFunctions")

/**
 * @param {{reps:[],scans:[],questions:[],products:[],event:{},{ReturnType<typeof VendorAnalyticsObject>}vendorAnalyticsObj }} data 
 * @param {ReturnType<typeof VendorAnalyticsObject>} obj
 */



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
      this.dayHourScans=[]; 
      this._activeRepMap = {}
      this._peakMap={}
  }

addScan(dayKey,hourKey,s){
   this.totalScans ++;
   this.allScans.push(s)
  let obj = this.dayHourScans.find(i => i.dayKey === dayKey);
  if (!obj) {obj = { dayKey, hours: {} };
  this.dayHourScans.push(obj);}
  obj.hours[hourKey] = (obj.hours[hourKey] ?? 0) + 1;
  this._activeRepMap[s.salesRepId] ||= { active: false, count: 0 };
  this._activeRepMap[s.salesRepId].count++;
  this._activeRepMap[s.salesRepId].active = true;

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
    this.scansPerDayHour = [];     
    this.avgScansPerDayHour = [];  
    this.peakDayHour = [];       
    this.isActive = false;
  }
  addScan(reps=[],scan,dayKey,hourKey){
   const rep = reps.find(r =>scan.salesRepId === r.id )
   this.id = rep.id
   this.name = rep.name
   this.totalScans++
   this.isActive = true
   this.scans.push(scan)
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
  vendorAnalyticsObj.booth = new BoothAnalytics()
  const repMap = {}
  data.eventScans.forEach(s => {
  const{dayKey,hourKey} = func.getDayHourKeys(s.scannedAt,data.event.timeZone)
  vendorAnalyticsObj.booth.addScan(dayKey,hourKey,s)
  const repId =s.salesRepId;
  if(!repId) return;
  repMap[repId]||= new RepAnalytics()
  repMap[repId].addScan(data.reps,s,dayKey,hourKey)
  })
  vendorAnalyticsObj.booth.sort()
  vendorAnalyticsObj.booth.finalize()
   vendorAnalyticsObj.booth.addQuestions(data.questions);
  vendorAnalyticsObj.reps = Object.values(repMap)
  vendorAnalyticsObj.reps.forEach(r => r.finalize())
  return vendorAnalyticsObj

  }  

 




module.exports={BoothAnalytics,RepAnalytics,buildVendorAnalytics}