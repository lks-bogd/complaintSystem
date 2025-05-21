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
      defaultValue: 1, // Нужно переделать так, чтобы брал не индекс, а по name
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

module.exports = Complaint;
