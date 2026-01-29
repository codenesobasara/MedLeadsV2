const User = require("./Users");
const HostProfile = require("./HostProfile");
const VendorProfile = require("./VendorProfile");
const RepProfile = require("./SalesRepProfile");
const SalesRepTerritory = require("./salesRepTerretories"); 

const Event = require("./EventModel");
const Attendee = require("./Attendee");
const Scan = require("./ScanModel");
const ScanAnswer = require("./ScanAnswers");
const VendorProduct = require("./VendorProductsModel");
const VendorQuestion = require("./VendorQuestions");
const ScanProduct = require("./ScanProducts");

Scan.belongsToMany(VendorProduct, { through: ScanProduct, foreignKey: 'scanId' });
VendorProduct.belongsToMany(Scan, { through: ScanProduct, foreignKey: 'productId' });

User.hasOne(HostProfile, { foreignKey: "userId" });
HostProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(VendorProfile, { foreignKey: "userId" });
VendorProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(RepProfile, { foreignKey: "userId" });
RepProfile.belongsTo(User, { foreignKey: "userId" });

HostProfile.hasMany(Event, { foreignKey: "hostId" });
Event.belongsTo(HostProfile, { foreignKey: "hostId" });

Attendee.hasMany(Scan, { foreignKey: "attendeeId" });
Scan.belongsTo(Attendee, { foreignKey: "attendeeId" });

Event.hasMany(Attendee, { foreignKey: "eventId" });
Attendee.belongsTo(Event, { foreignKey: "eventId" });

Event.hasMany(VendorProfile, { foreignKey: "eventId" });
VendorProfile.belongsTo(Event, { foreignKey: "eventId" });

VendorProfile.hasMany(RepProfile, { foreignKey: "vendorId" });
RepProfile.belongsTo(VendorProfile, { foreignKey: "vendorId" });

Event.hasMany(RepProfile, { foreignKey: "eventId" });
RepProfile.belongsTo(Event, { foreignKey: "eventId" });

VendorProfile.hasMany(VendorProduct, { foreignKey: "vendorId" });
VendorProduct.belongsTo(VendorProfile, { foreignKey: "vendorId" });

Event.hasMany(VendorProduct, { foreignKey: "eventId" });
VendorProduct.belongsTo(Event, { foreignKey: "eventId" });

VendorProfile.hasMany(VendorQuestion, { foreignKey: "vendorId" });
VendorQuestion.belongsTo(VendorProfile, { foreignKey: "vendorId" });

Event.hasMany(VendorQuestion, { foreignKey: "eventId" });
VendorQuestion.belongsTo(Event, { foreignKey: "eventId" });

VendorProfile.hasMany(Scan, { foreignKey: "vendorId" });
Scan.belongsTo(VendorProfile, { foreignKey: "vendorId" });

Event.hasMany(Scan, { foreignKey: "eventId" });
Scan.belongsTo(Event, { foreignKey: "eventId" });

RepProfile.hasMany(Scan, { foreignKey: "salesRepId" });
Scan.belongsTo(RepProfile, { foreignKey: "salesRepId" });

Scan.hasMany(ScanAnswer, { foreignKey: "scanId" });
ScanAnswer.belongsTo(Scan, { foreignKey: "scanId" });

VendorQuestion.hasMany(ScanAnswer, { foreignKey: "vendorQuestionId" });
ScanAnswer.belongsTo(VendorQuestion, { foreignKey: "vendorQuestionId" });

RepProfile.hasMany(SalesRepTerritory, { foreignKey: "salesRepId", as: "territories" });
SalesRepTerritory.belongsTo(RepProfile, { foreignKey: "salesRepId" });

module.exports = {
  User,
  HostProfile,
  VendorProfile,
  RepProfile,
  SalesRepTerritory, 
  Event,
  Attendee,
  Scan,
  ScanAnswer,
  VendorProduct,
  VendorQuestion,
};
