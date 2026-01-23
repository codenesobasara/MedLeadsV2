// vendorQuestionsSeeder.js

console.log(">>> RUNNING vendorQuestionsSeeder.js");

const db = require("../mainConfig");                   // your Sequelize instance
const VendorQuestion = require("../Models/VendorQuestions"); // your VendorQuestion model

async function seedVendorQuestions() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await VendorQuestion.sync();

    const questions = [];

    let qid = 1;

    const makeProductQuestions = (vendorId, eventId) => [
      {
        id: qid++,
        vendorId,
        eventId,
        questionText: "Which product are you most interested in?",
        type: "MULTI_CHOICE",
        isRequired: true,
        order: 1,
        isActive: true,
        helpText: "Select the product discussed at the booth.",
      },
      {
        id: qid++,
        vendorId,
        eventId,
        questionText: "Do you want a demo scheduled for that product?",
        type: "YES_NO",
        isRequired: true,
        order: 2,
        isActive: true,
        helpText: "Yes/No",
      },
      {
        id: qid++,
        vendorId,
        eventId,
        questionText: "When is the best time to follow up?",
        type: "TEXT",
        isRequired: false,
        order: 3,
        isActive: true,
        helpText: "e.g., Morning / Afternoon / Evening",
      },
      {
        id: qid++,
        vendorId,
        eventId,
        questionText: "Any notes about what they need from this product?",
        type: "TEXT",
        isRequired: false,
        order: 4,
        isActive: true,
        helpText: "Optional details: use case, budget, timeline, etc.",
      },
    ];

    // =================================================
    // Event 15 → Vendors 1–15
    // =================================================
    for (let vendorId = 1; vendorId <= 15; vendorId++) {
      questions.push(...makeProductQuestions(vendorId, 15));
    }

    // =================================================
    // Event 16 → Vendors 16–43
    // =================================================
    for (let vendorId = 16; vendorId <= 43; vendorId++) {
      questions.push(...makeProductQuestions(vendorId, 16));
    }

    await VendorQuestion.bulkCreate(questions);
    console.log(" VendorQuestion seed completed.");
  } catch (err) {
    console.error(" Error seeding vendor questions:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedVendorQuestions();