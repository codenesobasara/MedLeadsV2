// vendorProductsSeeder.js

console.log(">>> RUNNING vendorProductsSeeder.js");

const db = require("../config/mainConfig");                  // your Sequelize instance
const VendorProduct = require("../Models/VendorProductsModel");  // your VendorProduct model

async function seedVendorProducts() {
  try {
    await db.authenticate();
    console.log("Connected to MariaDB for seeding");
    await VendorProduct.sync();

    const products = [];

    // =================================================
    // Event 15 → Vendors 1–15 (2 products each)
    // =================================================
    for (let vendorId = 1; vendorId <= 15; vendorId++) {
      products.push(
        {
          vendorId,
          eventId: 15,
          name: `Event15 Vendor${vendorId} Core Device`,
          description: "Primary medical device showcased at the event.",
          category: "Medical Devices",
          sku: `E15-V${vendorId}-CORE`,
          isFdaApproved: true,
          fdaApprovalNumber: `FDA-E15V${vendorId}-2025`,
          fdaClass: "Class II",
        },
        {
          vendorId,
          eventId: 15,
          name: `Event15 Vendor${vendorId} Software Suite`,
          description: "Companion software and analytics platform.",
          category: "Software",
          sku: `E15-V${vendorId}-SW`,
          isFdaApproved: false,
        }
      );
    }

    // =================================================
    // Event 16 → Vendors 16–43 (2 products each)
    // =================================================
    for (let vendorId = 16; vendorId <= 43; vendorId++) {
      products.push(
        {
          vendorId,
          eventId: 16,
          name: `Event16 Vendor${vendorId} Diagnostic Tool`,
          description: "Advanced diagnostic solution for clinical use.",
          category: "Diagnostics",
          sku: `E16-V${vendorId}-DX`,
          isFdaApproved: true,
          fdaApprovalNumber: `FDA-E16V${vendorId}-2024`,
          fdaClass: "Class II",
        },
        {
          vendorId,
          eventId: 16,
          name: `Event16 Vendor${vendorId} Accessory Kit`,
          description: "Optional accessories and add-ons.",
          category: "Accessories",
          sku: `E16-V${vendorId}-ACC`,
          isFdaApproved: false,
        }
      );
    }

    await VendorProduct.bulkCreate(products);
    console.log(" VendorProduct seed completed.");
  } catch (err) {
    console.error(" Error seeding vendor products:", err);
  } finally {
    await db.close();
    process.exit();
  }
}

seedVendorProducts();