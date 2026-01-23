// eventSeeder.js

console.log(">>> RUNNING eventSeeder.js");

const db = require("../config/mainConfig");      
const Event = require("../Models/EventModel");    
async function seedEvents() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");

    const events = [
      {
        id: 15,
        hostId: 3,
        name: "MedLeads Live Expo Day",
        eventType: "expo",
        description: "Main expo event with active lead scanning across multiple days.",
        startDate: new Date("2024-06-10T09:00:00"),
        endDate: new Date("2024-06-12T17:00:00"),
        venue: "Enercare Centre",
        city: "Toronto",
        region: "ON",
        estimatedAttendees: 900,
        attendeeGroups: "Family Medicine, Cardiology, Orthopedics",
        format: "in-person",
        timezone: "America/Toronto",
      },
      {
        id: 16,
        hostId: 3,
        name: "MedLeads Follow-Up Workshop",
        eventType: "workshop",
        description: "Post-expo workshops, training sessions, and vendor follow-ups.",
        startDate: new Date("2024-08-05T09:00:00"),
        endDate: new Date("2024-08-07T16:00:00"),
        venue: "Hotel Conference Hall",
        city: "Toronto",
        region: "ON",
        estimatedAttendees: 260,
        attendeeGroups: "Sales Teams, Practice Managers",
        format: "hybrid",
        timezone: "America/Toronto",
      },
    ];

    await Event.bulkCreate(events);
    console.log(" Event seed completed.");
  } catch (err) {
    console.error(" Error seeding events:", err);
  } finally {
    await db.close();
    process.exit();
  }
}
seedEvents();