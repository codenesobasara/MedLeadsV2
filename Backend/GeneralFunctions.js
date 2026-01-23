const { DateTime } = require('luxon');

function createAttendeeAnalyticsObj(a) {
  return {
    attendeeId: a.id,
     npi: a.npi || null,
    firstName: a.firstName,
    lastName: a.lastName,
    specialty: a.specialty,
    email: a.email,
    phone: a.phone,
    physician: a.physician,
    checkedIn: a.checkedIn,

    totalScans: 0,

    vendors: [],  
    reps: [],     
    byDayHour: [],    
    allTimes: []   
  };
}

function getDayHourKeys(date, tz) {
  const dt = DateTime.fromJSDate(new Date(date), { zone: tz });
  return {
    dayKey: dt.toFormat('dd-LL-yyyy'),
    hourKey: dt.toFormat('dd-LL-yyy-HH'),
    iso: dt.toISO(),            
    hourLabel: dt.toFormat('ha') 
  };
}


function createEventAnalyticsObject() {
  return {
    summary: {
      attendingVendorsAmount: 0,
      activeVendorsAmount: 0,
      topVendor: "",
      vendorEngagementRate: 0,
      avgScansPerActiveVendor: 0,

       peakHour: {
        Day: "",
        hourKey: "",
        scans: 0,
      },
    },
    topFiveVendors:[],
    eventScans:[],  
    Attendingvendors: [],
    activeVendors:[],
    vendorChartData:[],
    totals: {
      totalScans: 0,
      byDayHour: {},
    },
  };
}


function SalesRepAnalyticsObj(){
  return{
   summary:{
    repsAttending:0,
    totalScans:0,
    ActiveReps:0,
    avgScansPerRep:0,

     peakHours:{
      day:"",
      hourKey: "",
      scans:0,
     },
      totals: {
      totalScans: 0,
      byDayHour: {},
    },
   

   },

   salesReps:[],
   boothScans:[],
   lineChartData:{},
   questions:[],
   products:[]

   

  }
}

function salesRepObj(){
  return{
    repId:0,
    repName:"",
    vendorId:0

  }
}


function salesRepObj(){
 return {repId:0,
         repName:"",
         isActive:false,
         scans:[],
         scanInsights:{
          scanPercent:0,
          totalAvrg:0,
          totalScans:0
         },
      dayHour:[]
}

}


function createEngagementCharObject(){
return {
  vendorId: 0,
  vendorName: "",
  totalScans: 0,
  activeScanHours: 0,
  scansByHours: []
}
}

module.exports ={createAttendeeAnalyticsObj,getDayHourKeys,createEventAnalyticsObject,createEngagementCharObject, SalesRepAnalyticsObj }