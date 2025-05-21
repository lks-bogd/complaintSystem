const { Complaint, ComplaintStatus } = require("../models/index.js");

create = async (req, res) => {
  try {
    const { topic, text } = req.body;
    const complaint = await Complaint.create({ topic, text });
    res.status(201).json(complaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

getAll = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();
    res.status(200).json(complaints);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

takeInWork = async (req, res) => {
  try {
    const { id } = req.params;

    const existingComplaint = await Complaint.findByPk(id);
    if (!existingComplaint) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }

    const inProgressStatus = await ComplaintStatus.findOne({
      where: { name: "in_progress" },
    });

    const updatedComplaint = await Complaint.update(
      { statusId: inProgressStatus.id },
      { where: { id } }
    );
    res.status(200).json(updatedComplaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

resolveComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { solutionText } = req.body;

    const existingComplaint = await Complaint.findByPk(id);
    if (!existingComplaint) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }

    const resolvedStatus = await ComplaintStatus.findOne({
      where: { name: "resolved" },
    });

    const updatedComplaint = await Complaint.update(
      { statusId: resolvedStatus.id, solutionText: solutionText },
      { where: { id } }
    );
    res.status(200).json(updatedComplaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

cancelComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelText } = req.body;

    const existingComplaint = await Complaint.findByPk(id);
    if (!existingComplaint) {
      return res.status(404).json({ error: "Обращение не найдено" });
    }

    const cancelledStatus = await ComplaintStatus.findOne({
      where: { name: "cancelled" },
    });

    const updatedComplaint = await Complaint.update(
      { statusId: cancelledStatus.id, cancelText: cancelText },
      { where: { id } }
    );
    res.status(200).json(updatedComplaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

cancelAllInProgress = async (req, res) => {
  try {
    const cancelledStatus = await ComplaintStatus.findOne({
      where: { name: "cancelled" },
    });
    const inProgressStatus = await ComplaintStatus.findOne({
      where: { name: "in_progress" },
    });

    const updatedComplaints = await Complaint.update(
      { statusId: cancelledStatus.id },
      { where: { statusId: inProgressStatus.id } }
    );
    res.status(200).json(updatedComplaints);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

module.exports = {
  create,
  getAll,
  takeInWork,
  cancelComplaint,
  cancelAllInProgress,
  resolveComplaint,
};
