const { ComplaintStatus } = require("../models");

create = async (req, res) => {
  try {
    const { name, alias, description } = req.body;
    const complaintStatus = await ComplaintStatus.create({
      name,
      alias,
      description,
    });
    res.status(201).json(complaintStatus);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

update = async (req, res) => {
  try {
    const { id } = req.params;
    const existingStatus = await ComplaintStatus.findByPk(id);
    if (!existingStatus) {
      return res.status(404).json({ error: "Статуса не существует" });
    }
    const { name, alias, description } = req.body;
    const updatedStatus = await ComplaintStatus.update(
      {
        name,
        alias,
        description,
      },
      { where: { id } }
    );
    res.status(200).json(updatedStatus);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

module.exports = { create, update };
