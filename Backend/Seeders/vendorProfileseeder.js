// vendorProfileSeeder.js

console.log(">>> RUNNING vendorProfileSeeder.js");

const db = require("../config/mainConfig");          // your Sequelize instance
const VendorProfile = require("../Models/VendorProfile"); // your Vendor model

async function seedVendors() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await VendorProfile.sync();

    const vendors = [];

    // =================================================
    // Event 15 → 50 vendors (IDs 1–50)
    // IMPORTANT: vendorId 3 is Event 15 (id: 3)
    // =================================================
    const event15Companies = [
      "MedTech Solutions",
      "PulseCare Systems",
      "Nova Diagnostics",
      "CardioWave Inc",
      "OrthoFlex Medical",
      "VitalScan Health",
      "ClearPath Imaging",
      "LifeBridge Pharma",
      "Apex Medical Devices",
      "HealthSync Labs",
      "TrueCare Analytics",
      "Medisphere Corp",
      "NextGen Health",
      "OptiCare Systems",
      "PrimeDx",
      "BioTrack Medical",
      "CoreVitals",
      "MediCore Technologies",
      "Insight Health AI",
      "PrecisionMed",
      "Healix Solutions",
      "Clarity Diagnostics",
      "CareStream Medical",
      "Summit HealthTech",
      "BluePeak Medical",
      "Unity Clinical",
      "Axis Health Systems",
      "PulsePoint Medical",
      "Vertex Diagnostics",
      "SureScan Health",
      "MedAxis Group",
      "CareLogic Systems",
      "OmniHealth Tech",
      "Evergreen Medical",
      "Pathway Diagnostics",
      "Nexis Health",
      "VitalEdge Medical",
      "AccuHealth Labs",
      "Radiant Medical",
      "ProCare Innovations",
      "LifeSignal Systems",
      "HealthNova",
      "ClearView Diagnostics",
      "TruMed Devices",
      "BioSense Medical",
      "CoreHealth Solutions",
      "MedFrontier",
      "PulseLine Health",
      "Axiom Medical",
      "Harborview Clinical Systems", // <-- #50 (fix: was missing before)
    ];

    const contactNames15 = [
      "Alex Johnson",
      "Taylor Morgan",
      "Casey Patel",
      "Jordan Smith",
      "Riley Chen",
      "Avery Thompson",
      "Cameron Lee",
      "Quinn Davis",
      "Morgan Rivera",
      "Jamie Wilson",
    ];

    for (let i = 1; i <= 50; i++) {
      vendors.push({
        id: i,
        eventId: 15,
        userId: 500 + i, // assumes vendor users exist or will exist
        companyName: event15Companies[i - 1], // guaranteed not null now
        contactName: contactNames15[(i - 1) % contactNames15.length],
        contactEmail: `event15_vendor${i}@vendors.dev`,
        contactPhone: `416-555-${String(3000 + i).padStart(4, "0")}`,
        boothNumber: `E15-${i}`,
      });
    }

    // =================================================
    // Event 16 → 50 vendors (IDs 51–100)
    // =================================================
    const event16Companies = [
      "CareNext Solutions",
      "MedCloud Systems",
      "OrthoNova",
      "ScanWell Technologies",
      "HealthBridge AI",
      "VitaCore Medical",
      "SmartDx",
      "Clinix Systems",
      "EchoMed Devices",
      "PrimeHealth Tech",
      "Lumina Diagnostics",
      "TrueNorth Medical",
      "MedPilot",
      "CareSphere",
      "HealthAxis",
      "BioPulse Medical",
      "NextWave Health",
      "Precision Care Labs",
      "NovaCare Systems",
      "ClearHealth Solutions",
      "OmniDx",
      "MedLink Technologies",
      "VitalPath",
      "InsightCare",
      "Aegis Medical",
      "SummitDx",
      "PulseIQ Health",
      "MedStrata",
      "CarePoint Innovations",
      "Optimum Medical",
      "Pathfinder Health",
      "RadiantDx",
      "CoreMed Analytics",
      "LifeTrack Systems",
      "BlueNova Medical",
      "HealthForge",
      "AccuDx",
      "MedHorizon",
      "SignalCare",
      "UnityDx",
      "Atlas Medical",
      "TruePulse Health",
      "CareVista",
      "MedIntel",
      "PrimeCare Systems",
      "BioClarity",
      "HealthVector",
      "OmniCare Medical",
      "NextGen Diagnostics",
      "Northshore Med Systems", // <-- #50 (fix: was missing before)
    ];

    const contactNames16 = [
      "Jordan Smith",
      "Sam Bennett",
      "Drew Martinez",
      "Parker Hughes",
      "Reese Kim",
      "Logan Price",
      "Hayden Brooks",
      "Finley Cooper",
      "Rowan Nguyen",
      "Emerson Clark",
    ];

    for (let i = 1; i <= 50; i++) {
      vendors.push({
        id: 50 + i,
        eventId: 16,
        userId: 600 + i, // assumes vendor users exist or will exist
        companyName: event16Companies[i - 1], // guaranteed not null now
        contactName: contactNames16[(i - 1) % contactNames16.length],
        contactEmail: `event16_vendor${i}@vendors.dev`,
        contactPhone: `647-555-${String(4000 + i).padStart(4, "0")}`,
        boothNumber: `E16-${i}`,
      });
    }

    await VendorProfile.bulkCreate(vendors);
    console.log(" Vendor seed completed.");
  } catch (err) {
    console.error(" Error seeding vendors:", err);
  } finally {
    await db.close();
    process.exit();
  }
}


seedVendors();
