const express = require("express");
const complaintRouter = require("./complaintRoutes");
const complaintStatusRouter = require("./complaintStatusRoutes");

const router = express.Router();

router.use("/complaints", complaintRouter);
router.use("/complaintStatuses", complaintStatusRouter);

module.exports = router;
