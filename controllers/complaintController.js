const { Complaint, ComplaintStatus } = require("../models/index.js");

create = async (req, res) => {
  try {
    const { topic, text } = req.body;
    const status = await ComplaintStatus.findOne({ where: { name: "new" } });
    if (!status) {
      return res.status(400).json({ error: `Статус "new" не найден` });
    }

    const complaint = await Complaint.create({
      topic,
      text,
      statusId: status.id,
    });
    res.status(201).json(complaint);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

getAll = async (req, res) => {
  try {
    const { fromDate, toDate, page = 1, limit = 10 } = req.query;
    const where = {};

    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({
          error: "Некорректные даты",
        });
      }

      where.createdAt = {
        [Complaint.Op.between]: [startDate, endDate],
      };
    } else if (fromDate && !toDate) {
      const date = new Date(fromDate);

      if (isNaN(date)) {
        return res.status(400).json({
          error: "Некорректная дата",
        });
      }

      where.createdAt = {
        [Complaint.Op.between]: [
          new Date(date.setHours(0, 0, 0, 0)),
          new Date(date.setHours(23, 59, 59, 999)),
        ],
      };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        error: 'Параметры "page" и "limit" должны быть положительными',
      });
    }

    const { count, rows } = await Complaint.findAndCountAll({
      where: where,
      include: [{ model: ComplaintStatus, as: "complaintStatus" }],
      limit: limitNumber,
      offset: offset,
      order: [["id", "asc"]],
    });

    res.status(200).json({
      total: count,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows,
    });
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
