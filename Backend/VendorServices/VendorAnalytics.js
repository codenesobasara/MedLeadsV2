const func = require("../GeneralFunctions");
const vendorFunc = require("../VendorServices/VendorFunctions");
const VendorEvents = require("../Models/Vendorevent");
const EventModel = require("../Models/EventModel");
const SalesRep = require("../Models/SalesRepProfile");
const VendorQuestion = require("../Models/VendorQuestions");
const VendorProduct = require("../Models/VendorProductsModel");
const Scan = require("../Models/ScanModel");
const Attendee = require("../Models/Attendee");
const Shift = require("../Models/ShiftsModel");
const { col, literal, fn, Op } = require("sequelize");
const { DateTime } = require("luxon");

async function boothBase(vendorId, eventId) {
  const repCount = await SalesRep.count({ where: { eventId, vendorId } });
  const totalScanCount = await Scan.count({
    where: { vendorId, eventId, type: "scan" },
  });
  const activeRepCount = await Scan.count({
    where: { vendorId, eventId, type: "scan" },
    distinct: true,
    col: "salesRepId",
  });
  const attendeesScanned = await Scan.count({
    where: { vendorId, eventId, type: "scan" },
    distinct: true,
    col: "attendeeId",
  });
  const questions = await VendorQuestion.findAll({ where: { vendorId, eventId } });
  const topFiveReps = await Scan.findAll({
    where: { eventId, vendorId, type: "scan" },
    attributes: ["salesRepId", [fn("COUNT", col("Scan.id")), "ScanCount"]],
    include: [
      {
        model: SalesRep,
        attributes: ["firstName", "lastName"],
        required: true,
      },
    ],
    group: ["Scan.salesRepId", "SalesRep.id"],
    order: [[literal("ScanCount"), "DESC"]],
    limit: 5,
    raw: true,
  });

  const topFiveAttendees = await Scan.findAll({
    where: { eventId, vendorId, type: "scan" },
    attributes: ["attendeeId", [fn("COUNT", col("Scan.id")), "ScanCount"]],
    include: [
      {
        model: Attendee,
        attributes: ["firstName", "lastName"],
        required: true,
      },
    ],
    group: ["Scan.attendeeId", "Attendee.id"],
    order: [[literal("ScanCount"), "DESC"]],
    limit: 5,
    raw: true,
  });

  const peakScanDay = await Scan.findOne({
    where: { eventId, vendorId, type: "scan" },
    attributes: [
      [fn("DATE", col("createdAt")), "day"],
      [fn("COUNT", col("id")), "scanCount"],
    ],
   
    group: [literal("DATE(`Scan`.`createdAt`)")],
    order: [[literal("scanCount"), "DESC"]],
    raw: true,
  });

  return {
    repCount,
    totalScanCount,
    activeRepCount,
    attendeesScanned,
    questions,
    topFiveReps,
    topFiveAttendees,
    peakScanDay,
  };
}

function repAnalytics(data) {
  const repMap = new Map();

  data.repBase.forEach(r => {
    repMap.set(r.id, {
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      phone: r.phone,
      isRemote: !!r.isRemote,

      totalScans: 0,
      totAvgScansPerHour: 0,
      avgScansPerDay: 0,

      scansPerDayHour: [],
      shifts: [],

      isActive: false,
    });
  });

  data.currentStaffing.forEach(s => {
    const rep = repMap.get(s.salesRepId);
    if (!rep) return;

    rep.shifts.push({
      id: s.id,
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    });

    rep.isActive = true;
  });


  data.repTotals.forEach(row => {
    const rep = repMap.get(Number(row.repId));
    if (!rep) return;
    rep.totalScans = Number(row.totalScans || 0);
  });


  data.repDayHourRows.forEach(row => {
    const rep = repMap.get(Number(row.repId));
    if (!rep) return;

    let dayObj = rep.scansPerDayHour.find(d => d.dayKey === row.dayKey);
    if (!dayObj) {
      dayObj = { dayKey: row.dayKey, hours: {} };
      rep.scansPerDayHour.push(dayObj);
    }

    dayObj.hours[String(row.hour)] = Number(row.count || 0);
  });


  repMap.forEach(rep => {
    const day = rep.scansPerDayHour.find(d => d.dayKey === data.dayKey);
    if (!day) return;

    const hours = Object.keys(day.hours);
    const activeHourCount = hours.length;
    const dayScanTotal = Object.values(day.hours).reduce((a, b) => a + b, 0);

    rep.totAvgScansPerHour = activeHourCount
      ? Math.round((dayScanTotal / activeHourCount) * 10) / 10
      : 0;
  });

  return [...repMap.values()];
}
async function getRepAnalyticsData(vendorId, eventId, day) {
  const event = await EventModel.findByPk(eventId, {
    attributes: ["id", "startDate", "endDate", "timezone"],
    raw: true,
  });

  const eventDates = func.normalizeEventDates(event);

  const scanEndForEvent =
    eventDates.now < eventDates.eventEndDay ? eventDates.now : eventDates.eventEndDay;
  const offset = eventDates.eventStartDay.toFormat("ZZ");
  const dayKey = day
    ? DateTime.fromISO(String(day), { zone: eventDates.timezone }).toISODate()
    : eventDates.eventStartDay.toISODate();
  const data = {};
  data.vendorId = vendorId;
  data.eventId = eventId;
  data.event = event;
  data.eventDates = eventDates;
  data.scanEndForEvent = scanEndForEvent;
  data.offset = offset;
  data.dayKey = dayKey;

  data.currentStaffing = await vendorFunc.getCurrentStaffing(vendorId, eventId, dayKey);

  data.repIds = await vendorFunc.getRepIds(vendorId, eventId);
  if (data.repIds.length === 0) {
    data.repBase = [];
    data.repTotals = [];
    data.repDayHourRows = [];
    data.boothDayHourRows = [];
    return data;
  }

  data.repBase = await vendorFunc.getRepBase(data.repIds);

  data.repTotals = await vendorFunc.getRepTotals(
    vendorId,
    eventId,
    data.repIds,
    eventDates,
    scanEndForEvent
  );

  data.repDayHourRows = await vendorFunc.getRepDayHourRows(
    vendorId,
    eventId,
    data.repIds,
    eventDates,
    scanEndForEvent,
    offset
  );

  data.boothDayHourRows = await vendorFunc.getBoothDayHourRows(
    vendorId,
    eventId,
    eventDates,
    scanEndForEvent,
    offset
  );

  return data;
}
function buildBoothDayHourScans(boothDayHourRows) {
  const map = new Map();

  boothDayHourRows.forEach(r => {
    const dayKey = r.dayKey;
    const hour = String(r.hour);
    const count = Number(r.count || 0);

    if (!map.has(dayKey)) map.set(dayKey, { dayKey, hours: {} });
    map.get(dayKey).hours[hour] = count;
  });

  return [...map.values()];
}

function buildRepAnalyticsObject(data) {
  return {
    dayKey: data.dayKey,
    currentStaffing: data.currentStaffing,
    reps: repAnalytics(data),
    booth: {
      dayHourScans: buildBoothDayHourScans(data.boothDayHourRows || []),
    },
  };
}



async function getBoothBaseData(vendorId, eventId) {
  const event = await EventModel.findByPk(eventId, {
    attributes: ["id", "startDate", "endDate", "timezone"],
    raw: true,
  });

  const eventDates = func.normalizeEventDates(event);

  const scanEndForEvent =
    eventDates.now < eventDates.eventEndDay
      ? eventDates.now
      : eventDates.eventEndDay;

  const offset = eventDates.eventStartDay.toFormat("ZZ");

  const data = {};

  data.repCount = await vendorFunc.getBoothRepCount(vendorId, eventId);
  data.totalScanCount = await vendorFunc.getBoothTotalScanCount(vendorId, eventId, eventDates, scanEndForEvent);
  data.activeRepCount = await vendorFunc.getBoothActiveRepCount(vendorId, eventId, eventDates, scanEndForEvent);
  data.attendeesScanned = await vendorFunc.getBoothAttendeesScannedCount(vendorId, eventId, eventDates, scanEndForEvent);
  data.questions = await vendorFunc.getBoothQuestions(vendorId, eventId);
  data.topFiveReps = await vendorFunc.getBoothTopFiveReps(vendorId, eventId, eventDates, scanEndForEvent);
  data.topFiveAttendees = await vendorFunc.getBoothTopFiveAttendees(vendorId, eventId, eventDates, scanEndForEvent);
  data.peakScanDay = await vendorFunc.getBoothPeakScanDay(vendorId, eventId, eventDates, scanEndForEvent, offset);

  return data;
}


function buildBoothBaseObject(data) {
  return {
    repCount: data.repCount,
    totalScanCount: data.totalScanCount,
    activeRepCount: data.activeRepCount,
    attendeesScanned: data.attendeesScanned,
    questions: data.questions,
    topFiveReps: data.topFiveReps,
    topFiveAttendees: data.topFiveAttendees,
    peakScanDay: data.peakScanDay,
  };
}

async function enrichRep(rep,eventId) {
  const event = await EventModel.findByPk(eventId, {attributes:["id","startDate","endDate","timezone"], raw:true})
  if (!event) throw new Error(`Event ${eventId} not found`);
  if (!event.timezone) throw new Error(`Event ${eventId} missing timezone`);
  const eventDates = func.normalizeEventDates(event)
  const scanEndForEvent =
  eventDates.now < eventDates.eventEndDay
    ? eventDates.now
    : eventDates.eventEndDay;
    const offset = eventDates.eventStartDay.toFormat("ZZ")
    console.log("OFFSET:", offset);
    const dayKey = eventDates.eventStartDay.toISODate();
    const repId = [rep.id]
     const currentStaffingAll = await vendorFunc.getCurrentStaffing(rep.vendorId, eventId, dayKey);
     const currentStaffing = currentStaffingAll.filter(s => s.salesRepId === rep.id);
    const repTotals = await vendorFunc.getRepTotals(rep.vendorId,eventId,repId,eventDates,scanEndForEvent);
    const repDayHourRows = await vendorFunc.getRepDayHourRows(rep.vendorId,eventId,repId,eventDates,scanEndForEvent,offset);
    const repObj = {
    id: rep.id,
    firstName: rep.firstName,
    lastName: rep.lastName,
    email: rep.email,
    phone: rep.phone,
    isRemote: !!rep.isRemote,
    totalScans: 0,
    totAvgScansPerHour: 0,
    avgScansPerDay: 0,
    scansPerDayHour: [],
    shifts: [],
    isActive: false,
  };
  repObj.shifts = currentStaffing.map(s=>({id:s.id, date:s.date, startTime:s.startTime, endTime:s.endTime}))
   if (repTotals.length) {
    repObj.totalScans = Number(repTotals[0].totalScans || 0);
    repObj.isActive = repObj.totalScans > 0;
  }
  const dayMap = new Map();
  repDayHourRows.forEach(row => {
    if (!dayMap.has(row.dayKey)) dayMap.set(row.dayKey, { dayKey: row.dayKey, hours: {} });
    dayMap.get(row.dayKey).hours[String(row.hour)] = Number(row.count || 0);
  });
  repObj.scansPerDayHour = [...dayMap.values()];
   const selectedDay = repObj.scansPerDayHour.find(d => d.dayKey === dayKey);
     if (selectedDay) {
    const hours = Object.keys(selectedDay.hours);
    const total = Object.values(selectedDay.hours).reduce((a, b) => a + b, 0);

    repObj.totAvgScansPerHour = hours.length
      ? Math.round((total / hours.length) * 10) / 10
      : 0;
  }

  return repObj;
  
}




module.exports = {
  boothBase,
  repAnalytics,
  getRepAnalyticsData,
  buildRepAnalyticsObject,
  buildBoothDayHourScans,
  getBoothBaseData,
  buildBoothBaseObject,
  enrichRep
};