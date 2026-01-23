// userSeeder.js

console.log(">>> RUNNING userSeeder.js");

const db = require("./config/mainConfig");   // your Sequelize instance
const User = require("./Models/Users");      // your User model

async function seedUsers() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await User.sync();

    const users = [
      // admin
      {
        id: 1,
        email: "admin@medleads.dev",
        passwordHash: "$2b$10$seeded-admin-hash",
        firstName: "Admin",
        lastName: "User",
        companyName: "MedLeads",
        contactPhone: "416-555-0100",
        businessAddress: "100 King St W",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "admin",
        status: "ACTIVE",
      },

      // vendor users (map to VendorProfile userId: 4-7)
      {
        id: 4,
        email: "vendor1@vendors.dev",
        passwordHash: "$2b$10$seeded-vendor1-hash",
        firstName: "Vera",
        lastName: "Vendor",
        companyName: "PulsePoint Medical",
        contactPhone: "416-555-0111",
        businessAddress: "200 Bay St",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "vendor",
        status: "ACTIVE",
      },
      {
        id: 5,
        email: "vendor2@vendors.dev",
        passwordHash: "$2b$10$seeded-vendor2-hash",
        firstName: "Victor",
        lastName: "Vendor",
        companyName: "Clinix Devices",
        contactPhone: "416-555-0112",
        businessAddress: "210 Bay St",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "vendor",
        status: "ACTIVE",
      },
      {
        id: 6,
        email: "vendor3@vendors.dev",
        passwordHash: "$2b$10$seeded-vendor3-hash",
        firstName: "Val",
        lastName: "Vendor",
        companyName: "NeuroWave Labs",
        contactPhone: "416-555-0113",
        businessAddress: "220 Bay St",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "vendor",
        status: "ACTIVE",
      },
      {
        id: 7,
        email: "vendor4@vendors.dev",
        passwordHash: "$2b$10$seeded-vendor4-hash",
        firstName: "Vinnie",
        lastName: "Vendor",
        companyName: "OrthoNova",
        contactPhone: "416-555-0114",
        businessAddress: "230 Bay St",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "vendor",
        status: "ACTIVE",
      },

      // rep users (map to SalesReps ids 7-11)
      {
        id: 8,
        email: "rep1@reps.dev",
        passwordHash: "$2b$10$seeded-rep1-hash",
        firstName: "Sam",
        lastName: "Rep",
        companyName: "PulsePoint Medical",
        contactPhone: "416-555-0201",
        businessAddress: "10 Front St W",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "rep",
        status: "ACTIVE",
      },
      {
        id: 9,
        email: "rep2@reps.dev",
        passwordHash: "$2b$10$seeded-rep2-hash",
        firstName: "Riley",
        lastName: "Rep",
        companyName: "Clinix Devices",
        contactPhone: "416-555-0202",
        businessAddress: "20 Front St W",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "rep",
        status: "ACTIVE",
      },
      {
        id: 10,
        email: "rep3@reps.dev",
        passwordHash: "$2b$10$seeded-rep3-hash",
        firstName: "Jordan",
        lastName: "Rep",
        companyName: "NeuroWave Labs",
        contactPhone: "416-555-0203",
        businessAddress: "30 Front St W",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "rep",
        status: "ACTIVE",
      },
      {
        id: 11,
        email: "rep4@reps.dev",
        passwordHash: "$2b$10$seeded-rep4-hash",
        firstName: "Casey",
        lastName: "Rep",
        companyName: "OrthoNova",
        contactPhone: "416-555-0204",
        businessAddress: "40 Front St W",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "rep",
        status: "ACTIVE",
      },

      // host user (your host)
      {
        id: 3,
        email: "host@medleads.dev",
        passwordHash: "$2b$10$seeded-host-hash",
        firstName: "Holly",
        lastName: "Host",
        companyName: "MedLeads Events",
        contactPhone: "416-555-0300",
        businessAddress: "500 University Ave",
        city: "Toronto",
        province: "ON",
        country: "Canada",
        role: "host",
        status: "ACTIVE",
      },
    ];

    await User.bulkCreate(users);
    console.log(" User seed completed.");
  } catch (err) {
    console.error(" Error seeding users:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedUsers();
