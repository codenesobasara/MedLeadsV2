const { scan, count } = require("rxjs")
const {SalesRepAnalyticsObj} = require("../GeneralFunctions")
const func = require("../GeneralFunctions")
const vendorFunc = require("../VendorServices/VendorFunctions")
const {VendorAnalyticsObject} = require("../VendorServices/VendorFunctions")

/**
 * @param {{reps:[],scans:[],questions:[],products:[],event:{}}} data 
 * @param {ReturnType<typeof VendorAnalyticsObject>} obj
 */



class BoothAnalytics{
  constructor() {
      this.totalScans=0;
      this.avgScansPerRep=0;
      this.activeRepCount=0;
      this.peakDay={};
      this.peakDayHour={};
      this.questions=[];
      this.attendingReps=[];
      this.allScans=[];
      this.dayHourScans=[]; 
  }

addScan({dayKey,hourKey,reps=[]}){
   this.totalScans ++;
  let obj = this.dayHourScans.find(i => i.dayKey === dayKey);
  if (!obj) {obj = { dayKey, hours: {} };
  this.dayHourScans.push(obj);}
  obj.hours[hourKey] = (obj.hours[hourKey] ?? 0) + 1;


}
addQuestions(questions){
this.questions = questions
}
sort() {
const byDay = Object.entries(this.scansByDay)
    .map(([day, count]) => ({ day, count }))
    .sort((a, b) => b.count - a.count);
const byDayHour = Object.entries(this.scansByDayHour)
    .flatMap(([day, hoursObj]) =>
      Object.entries(hoursObj).map(([hour, count]) => ({ day, hour, count }))
    )
    .sort((a, b) => b.count - a.count);
  return { byDay, byDayHour };
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
      const peak={}
      this.scansPerDayHour.forEach(obj =>{
       Object.entries(obj.hours).forEach(([hourKey,scancount])=>{
        hourlyTotals[hourKey]||=[]
        hourlyTotals[hourKey].push(scancount)
       console.log("This is the full hourly totals:", hourlyTotals)
      
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
    

 




module.exports={BoothAnalytics,RepAnalytics,}