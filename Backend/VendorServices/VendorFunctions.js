const VendorEvents = require("../Models/Vendorevent")
const EventModel = require("../Models/EventModel")
const SalesRep = require("../Models/SalesRepProfile")
const VendorQuestion = require("../Models/VendorQuestions")
const VendorProduct = require("../Models/VendorProductsModel")
const Scan = require("../Models/ScanModel")
const Attendee = require("../Models/Attendee")
const Shift = require("../Models/ShiftsModel")
const func = require("../GeneralFunctions")
const { where, col, literal, fn } = require("sequelize")
const { DateTime } = require("luxon")
const { Op } = require("sequelize")

function normalizeEventDates(event) {
  const timezone = event.timezone

  const eventStartDay = DateTime.fromJSDate(event.startDate).setZone(timezone).startOf("day")
  const eventEndDay = DateTime.fromJSDate(event.endDate).setZone(timezone).endOf("day")
  const now = DateTime.now().setZone(timezone)

  return {
    timezone,
    eventStartDay,
    eventEndDay,
    now,
  }
}


async function getCurrentStaffing(vendorId, eventId, dayKey) {
  return Shift.findAll({
    where: { vendorId, eventId, date: dayKey },
    attributes: ["id", "salesRepId", "vendorId", "eventId", "date", "startTime", "endTime"],
    include: [
      {
        model: SalesRep,
        attributes: ["id", "firstName", "lastName", "email", "phone", "isRemote"],
        required: false,
      },
    ],
    order: [["startTime", "ASC"]],
  })
}

async function getShiftRepRows(vendorId, eventId) {
  return Shift.findAll({
    where: { vendorId, eventId },
    attributes: [[fn("DISTINCT", col("salesRepId")), "salesRepId"]],
    raw: true,
  })
}

async function getScanRepRows(vendorId, eventId) {
  return Scan.findAll({
    where: { vendorId, eventId, type: "scan" },
    attributes: [[fn("DISTINCT", col("salesRepId")), "salesRepId"]],
    raw: true,
  })
}

async function getRepIds(vendorId, eventId) {
  const [shiftRepRows, scanRepRows] = await Promise.all([
    getShiftRepRows(vendorId, eventId),
    getScanRepRows(vendorId, eventId),
  ])

  const repIdSet = new Set([
    ...shiftRepRows.map(r => r.salesRepId).filter(Boolean),
    ...scanRepRows.map(r => r.salesRepId).filter(Boolean),
  ])

  return [...repIdSet]
}

async function getRepBase(repIds) {
  return SalesRep.findAll({
    where: { id: { [Op.in]: repIds } },
    attributes: ["id", "firstName", "lastName", "email", "phone", "isRemote"],
    raw: true,
  })
}

async function getRepTotals(vendorId, eventId, repIds, eventDates, scanEndForEvent) {
  return Scan.findAll({
    where: {
      vendorId,
      eventId,
      type: "scan",
      salesRepId: { [Op.in]: repIds },
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    attributes: [["salesRepId", "repId"], [fn("COUNT", col("id")), "totalScans"]],
    group: ["salesRepId"],
    raw: true,
  })
}

async function getRepDayHourRows(vendorId, eventId, repIds, eventDates, scanEndForEvent, offset) {
  return Scan.findAll({
    where: {
      vendorId,
      eventId,
      type: "scan",
      salesRepId: { [Op.in]: repIds },
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    attributes: [
      ["salesRepId", "repId"],
      [literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`), "dayKey"],
      [literal(`HOUR(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`), "hour"],
      [fn("COUNT", col("id")), "count"],
    ],
    group: [
      "salesRepId",
      literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`),
      literal(`HOUR(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`),
    ],
    raw: true,
  })
}

async function getBoothDayHourRows(vendorId, eventId, eventDates, scanEndForEvent, offset) {
  return Scan.findAll({
    where: {
      vendorId,
      eventId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    attributes: [
      [literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`), "dayKey"],
      [literal(`HOUR(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`), "hour"],
      [fn("COUNT", col("id")), "count"],
    ],
    group: [
      literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`),
      literal(`HOUR(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`),
    ],
    raw: true,
  })
}


async function getVendorEvents(id) {
  const attendingEvents = await VendorEvents.findAll({
    where: { id },
    attributes: ["eventId"],
    raw: true,
  })
  const eventIds = attendingEvents.map(e => e.eventId)
  if (eventIds.length === 0) return []
  const events = await EventModel.findAll({ where: { id: eventIds } })
  return events.map(e => {
    const obj = e.toJSON()
    obj.attendeeGroups = obj.attendeeGroups ? JSON.parse(obj.attendeeGroups) : []
    return obj
  })
}

async function scansOverTimeChart(date, tz, vendorId, eventId) {
  const startLocal = DateTime.fromISO(date, { zone: tz }).startOf("day")
  const endLocal = startLocal.endOf("day")
  const startUtc = startLocal.toUTC().toJSDate()
  const endUtc = endLocal.toUTC().toJSDate()
  const offset = startLocal.toFormat("ZZ")

  const hourExpr = fn("HOUR", fn("CONVERT_TZ", col("Scan.scannedAt"), "+00:00", offset))

  const rows = await Scan.findAll({
    where: {
      eventId,
      vendorId,
      type: "scan",
      scannedAt: { [Op.between]: [startUtc, endUtc] },
    },
    attributes: [[hourExpr, "hour"], [fn("COUNT", col("Scan.id")), "count"]],
    group: [hourExpr],
    order: [[hourExpr, "ASC"]],
    raw: true,
  })

  const byHour = new Map(rows.map(r => [Number(r.hour), Number(r.count)]))
  const chartData = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: byHour.get(h) ?? 0,
  }))

  return chartData
}


async function getBoothRepCount(vendorId, eventId) {
  return SalesRep.count({ where: { eventId, vendorId } });
}

async function getBoothTotalScanCount(vendorId, eventId, eventDates, scanEndForEvent) {
  return Scan.count({
    where: {
      vendorId,
      eventId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
  });
}

async function getBoothActiveRepCount(vendorId, eventId, eventDates, scanEndForEvent) {
  return Scan.count({
    where: {
      vendorId,
      eventId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    distinct: true,
    col: "salesRepId",
  });
}

async function getBoothAttendeesScannedCount(vendorId, eventId, eventDates, scanEndForEvent) {
  return Scan.count({
    where: {
      vendorId,
      eventId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    distinct: true,
    col: "attendeeId",
  });
}

async function getBoothQuestions(vendorId, eventId) {
  return VendorQuestion.findAll({ where: { vendorId, eventId } });
}

async function getBoothTopFiveReps(vendorId, eventId, eventDates, scanEndForEvent) {
  return Scan.findAll({
    where: {
      eventId,
      vendorId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
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
}

async function getBoothTopFiveAttendees(vendorId, eventId, eventDates, scanEndForEvent) {
  return Scan.findAll({
    where: {
      eventId,
      vendorId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
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
}

async function getBoothPeakScanDay(vendorId, eventId, eventDates, scanEndForEvent, offset) {
  return Scan.findOne({
    where: {
      eventId,
      vendorId,
      type: "scan",
      scannedAt: { [Op.between]: [eventDates.eventStartDay.toJSDate(), scanEndForEvent.toJSDate()] },
    },
    attributes: [
      [literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`), "day"],
      [fn("COUNT", col("Scan.id")), "scanCount"],
    ],
    group: [literal(`DATE(CONVERT_TZ(\`Scan\`.\`scannedAt\`,'+00:00','${offset}'))`)],
    order: [[literal("scanCount"), "DESC"]],
    raw: true,
  });
}







module.exports = {
  getVendorEvents,
  scansOverTimeChart,
  normalizeEventDates,
  getCurrentStaffing,
  getShiftRepRows,
  getScanRepRows,
  getRepIds,
  getRepBase,
  getRepTotals,
  getRepDayHourRows,
  getBoothDayHourRows,
  getBoothRepCount,
  getBoothTotalScanCount,
  getBoothActiveRepCount,
  getBoothAttendeesScannedCount,
  getBoothQuestions,
  getBoothTopFiveReps,
  getBoothTopFiveAttendees,
  getBoothPeakScanDay,
}

