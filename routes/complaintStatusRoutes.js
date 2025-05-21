const express = require("express");

const {
  create,
  update,
} = require("../controllers/complaintStatusController.js");

const validateBodyFields = require("../middleware/validateBodyFields.js");

const complaintStatusRouter = express.Router();

complaintStatusRouter.post("/", validateBodyFields(["name", "alias"]), create);
complaintStatusRouter.put("/:id", update);

module.exports = complaintStatusRouter;
