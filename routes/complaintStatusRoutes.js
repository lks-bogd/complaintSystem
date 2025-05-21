const express = require("express");

const {
  create,
  update,
} = require("../controllers/complaintStatusController.js");

const complaintStatusRouter = express.Router();

complaintStatusRouter.post("/", create);
complaintStatusRouter.put("/:id", update);

module.exports = complaintStatusRouter;
