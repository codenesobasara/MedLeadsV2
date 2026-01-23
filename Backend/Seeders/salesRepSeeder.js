// salesRepSeeder.js

console.log(">>> RUNNING salesRepSeeder.js");

const db = require("../config/mainConfig");               // your Sequelize instance
const SalesReps = require("../Models/SalesRepProfile");   // your SalesReps model

async function seedSalesReps() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await SalesReps.sync();

    // Reps 7-11 are referenced by scans (keep these IDs)
    const reps = [
      { id: 7, vendorId: 2, eventId: 5, name: "Sam Rep", email: "rep1@reps.dev", phone: "416-555-0201" },
      { id: 8, vendorId: 3, eventId: 5, name: "Riley Rep", email: "rep2@reps.dev", phone: "416-555-0202" },
      { id: 9, vendorId: 4, eventId: 5, name: "Jordan Rep", email: "rep3@reps.dev", phone: "416-555-0203" },
      { id: 10, vendorId: 2, eventId: 5, name: "Casey Rep", email: "rep4@reps.dev", phone: "416-555-0204" },
      { id: 11, vendorId: 4, eventId: 5, name: "Taylor Rep", email: "rep5@reps.dev", phone: "416-555-0205" },
      { id: 11, vendorId: 4, eventId: 7, name: "Lily Rep", email: "rep5@reps.dev", phone: "416-555-0205" },
      { id: 11, vendorId: 4, eventId: 7, name: "hannah Rep", email: "rep5@reps.dev", phone: "416-555-0205" },
      { id: 11, vendorId: 4, eventId: 7, name: "Neso Rep", email: "rep5@reps.dev", phone: "416-555-0205" },
    ];

    await SalesReps.bulkCreate(reps);
    console.log(" SalesRep seed completed.");
  } catch (err) {
    console.error(" Error seeding sales reps:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedSalesReps();
