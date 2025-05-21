const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Complaint = sequelize.define(
  "Complaint",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ComplaintStatuses",
        key: "id",
      },
      allowNull: false,
    },
    solutionText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancelText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

Complaint.sequelize = sequelize;
Complaint.Op = sequelize.Sequelize.Op;

module.exports = Complaint;
