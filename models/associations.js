const ComplaintStatus = require("./complaintStatus.js");
const Complaint = require("./complaint.js");

ComplaintStatus.hasMany(Complaint, {
  foreignKey: "statusId",
  as: "complaints",
});

Complaint.belongsTo(ComplaintStatus, {
  foreignKey: "statusId",
  as: "complaintStatus",
});
