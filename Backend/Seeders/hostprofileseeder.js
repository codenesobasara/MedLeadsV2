// hostProfileSeeder.js

console.log(">>> RUNNING hostProfileSeeder.js");

const db = require("../config/mainConfig");         // your Sequelize instance
const HostProfile = require("../Models/HostProfile"); // your HostProfile model

async function seedHostProfiles() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await HostProfile.sync();

    const hosts = [
      { id: 1, userId: 1, companyName: "MedLeads (Admin Host)", contactName: "Admin User", contactEmail: "admin@medleads.dev", contactPhone: "416-555-0100" },
      { id: 2, userId: 4, companyName: "Test Host Co.", contactName: "Vera Vendor", contactEmail: "vendor1@vendors.dev", contactPhone: "416-555-0111" },

      // IMPORTANT: your hostId requirement
      { id: 3, userId: 3, companyName: "MedLeads Events (Host 3)", contactName: "Holly Host", contactEmail: "host3@medleads.dev", contactPhone: "416-555-0300" },
    ];

    await HostProfile.bulkCreate(hosts);
    console.log(" HostProfile seed completed.");
  } catch (err) {
    console.error(" Error seeding host profiles:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedHostProfiles();
