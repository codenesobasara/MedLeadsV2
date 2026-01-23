// vendorEventSeeder.js

console.log(">>> RUNNING vendorEventSeeder.js");

const db = require("../config/mainConfig");         // your Sequelize instance
const VendorEvent = require("../Models/Vendorevent"); // your VendorEvent model

async function seedVendorEvents() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await VendorEvent.sync();

    const vendorEvents = [];

    // =================================================
    // Event 15 → Vendors 1–15
    // =================================================
    for (let vendorId = 1; vendorId <= 15; vendorId++) {
      vendorEvents.push({
        vendorId,
        eventId: 15,
        status: "APPROVED",
        boothNumber: `A${vendorId}`, // matches VendorProfile booth pattern
      });
    }

    // =================================================
    // Event 16 → Vendors 16–43
    // =================================================
    for (let vendorId = 16; vendorId <= 43; vendorId++) {
      vendorEvents.push({
        vendorId,
        eventId: 16,
        status: "APPROVED",
        boothNumber: `B${vendorId - 15}`, // B1–B28
      });
    }

    await VendorEvent.bulkCreate(vendorEvents);
    console.log(" VendorEvent seed completed.");
  } catch (err) {
    console.error(" Error seeding vendor events:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedVendorEvents();