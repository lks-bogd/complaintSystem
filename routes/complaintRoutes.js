const express = require("express");

const {
  create,
  takeInWork,
  cancelComplaint,
  cancelAllInProgress,
  resolveComplaint,
  getAll,
} = require("../controllers/complaintController.js");

const complaintRouter = express.Router();

complaintRouter.post("/", create);
complaintRouter.get("/all", getAll);
complaintRouter.put("/:id/take_in_work", takeInWork);
complaintRouter.put("/:id/resolve", resolveComplaint);
complaintRouter.put("/:id/cancel", cancelComplaint);
complaintRouter.put("/cancel_all_in_progress", cancelAllInProgress);

module.exports = complaintRouter;
