const { DateTime } = require('luxon');



function getDayHourKeys(date, tz) {
  const dt = DateTime.fromJSDate(new Date(date), { zone: tz });
  return {
    dayKey: dt.toFormat('dd-LL-yyyy'),
    hourKey: dt.toFormat('dd-LL-yyy-HH'),
    iso: dt.toISO(),            
    hourLabel: dt.toFormat('ha') 
  };
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

function normalizeEventDates(event) {
  const timezone = event.timezone;
  const eventStartDay = DateTime
    .fromJSDate(event.startDate)
    .setZone(timezone)
    .startOf("day");
  const eventEndDay = DateTime
    .fromJSDate(event.endDate)
    .setZone(timezone)
    .endOf("day");
  const now = DateTime.now().setZone(timezone);
  return {
    timezone,
    eventStartDay,
    eventEndDay,
    now,
  };
}

module.exports ={getDayHourKeys,createEngagementCharObject, normalizeEventDates }