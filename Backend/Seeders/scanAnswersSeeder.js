// scanAnswerSeeder.js

console.log(">>> RUNNING scanAnswerSeeder.js");

const db = require("../config/mainConfig");           // your Sequelize instance
const ScanAnswer = require("../Models/ScanAnswers");  // your ScanAnswer model

async function seedScanAnswers() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await ScanAnswer.sync();

    // Assumes scans get auto IDs starting at 1 in a fresh DB.
    // Add a handful of answers tied to vendorQuestionIds 1-8.
    const answers = [
      { scanId: 2, vendorQuestionId: 1, answerText: "Yes" },
      { scanId: 2, vendorQuestionId: 2, answerText: "Imaging + clinic workflow" },

      { scanId: 6, vendorQuestionId: 3, answerText: "Yes" },
      { scanId: 6, vendorQuestionId: 4, answerText: "Afternoons" },

      { scanId: 10, vendorQuestionId: 5, answerText: "Neurology" },
      { scanId: 10, vendorQuestionId: 6, answerText: "No" },

      { scanId: 15, vendorQuestionId: 7, answerText: "Yes" },
      { scanId: 15, vendorQuestionId: 8, answerText: "Current: BrandX" },
    ];

    await ScanAnswer.bulkCreate(answers);
    console.log(" ScanAnswer seed completed.");
  } catch (err) {
    console.error(" Error seeding scan answers:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedScanAnswers();
