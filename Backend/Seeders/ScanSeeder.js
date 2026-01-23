// scanSeeder.js

console.log(">>> RUNNING scanSeeder.js");

const db = require("../mainConfig");
const Scan = require("../Models/ScanModel");    // your Scan model
async function seedScans() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");

    // Recreate/ensure table
    await Scan.sync();

    const atTime = (day, hh, mm, ss) =>
      new Date(day.getFullYear(), day.getMonth(), day.getDate(), hh, mm, ss);

    function mulberry32(seed) {
      let a = seed >>> 0;
      return function () {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const event15Days = [
      new Date(2024, 5, 10),
      new Date(2024, 5, 11),
      new Date(2024, 5, 12),
    ];

    const event16Days = [
      new Date("2024-08-05"),
      new Date("2024-08-06"),
      new Date("2024-08-07"),
    ];

    const vendorIdsEvent15 = Array.from({ length: 50 }, (_, i) => i + 1);
    const vendorIdsEvent16 = Array.from({ length: 50 }, (_, i) => i + 51);

    const salesRepIds = [7, 8, 9, 10, 11];

    let globalScanIndex = 0;
    const nextAttendeeId = () => {
      globalScanIndex += 1;
      return 1 + ((globalScanIndex - 1) % 200);
    };

    const scans = [];

    const TOTAL_EVENT_15 = 3600;
    const TOTAL_EVENT_16 = 3600;

    const HOURS = Array.from({ length: 13 }, (_, i) => 9 + i);

    function buildHourWeights(vendorId, dayIndex, eventId) {
      const rng = mulberry32((vendorId * 100000) + (dayIndex * 1000) + (eventId * 17));
      const weights = HOURS.map(() => 1);

      const deadZoneCount = 3 + Math.floor(rng() * 4);
      const deadHours = new Set();
      while (deadHours.size < deadZoneCount) {
        deadHours.add(HOURS[Math.floor(rng() * HOURS.length)]);
      }
      for (let i = 0; i < HOURS.length; i++) {
        if (deadHours.has(HOURS[i])) weights[i] = 0;
      }

      const peakCount = rng() < 0.6 ? 2 : 3;
      const peaks = new Set();
      while (peaks.size < peakCount) {
        peaks.add(HOURS[Math.floor(rng() * HOURS.length)]);
      }
      for (let i = 0; i < HOURS.length; i++) {
        if (peaks.has(HOURS[i])) weights[i] += 12;
      }

      if (weights.every(w => w === 0)) weights[0] = 5;
      return weights;
    }

    function allocateByWeights(total, weights) {
      const sumW = weights.reduce((a, b) => a + b, 0);
      if (!sumW) return weights.map(() => 0);

      const raw = weights.map(w => (total * w) / sumW);
      const base = raw.map(x => Math.floor(x));
      let used = base.reduce((a, b) => a + b, 0);
      let rem = total - used;

      const fracs = raw
        .map((x, i) => ({ i, f: x - Math.floor(x) }))
        .sort((a, b) => b.f - a.f);

      let k = 0;
      while (rem--) base[fracs[k++ % fracs.length].i]++;

      return base;
    }

    function generateEventScans(eventId, days, vendorIds, total) {
      const perVendor = Math.floor(total / vendorIds.length);

      for (const vendorId of vendorIds) {
        const perDay = allocateByWeights(perVendor, days.map(() => 1));

        for (let d = 0; d < days.length; d++) {
          const perHour = allocateByWeights(
            perDay[d],
            buildHourWeights(vendorId, d, eventId)
          );

          for (let hi = 0; hi < HOURS.length; hi++) {
            const hh = HOURS[hi];
            for (let s = 0; s < perHour[hi]; s++) {
              scans.push({
                attendeeId: nextAttendeeId(),
                vendorId,
                eventId,
                salesRepId: salesRepIds[scans.length % salesRepIds.length],
                type: "scan",
                scannedAt: atTime(days[d], hh, 5 + (s % 50), 10),
              });
            }
          }
        }
      }
    }

    generateEventScans(15, event15Days, vendorIdsEvent15, TOTAL_EVENT_15);
    generateEventScans(16, event16Days, vendorIdsEvent16, TOTAL_EVENT_16);

    await Scan.bulkCreate(scans);
    console.log(`Scan seed completed. Inserted ${scans.length} scans.`);
  } catch (err) {
    console.error("Error seeding scans:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedScans();