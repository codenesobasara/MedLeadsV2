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
    vendorCharData:[],
    totals: {
      totalScans: 0,
      byDayHour: {},
    },
  };
}


function createVendorCharObject(){
return {
  vendorId: 0,
  vendorName: "",
  totalScans: 0,
  activeScanHours: 0,
  scansByHours: []
}
}

module.exports ={createAttendeeAnalyticsObj,getDayHourKeys,createEventAnalyticsObject,createVendorCharObject }