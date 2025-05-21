const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db.js");

const router = require("./routes/index.js");

require("dotenv").config();

require("./models/index.js");
require("./models/associations.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", router);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Подключение к БД установлено");

    await sequelize.sync({ force: false });
    console.log("Модели БД синхронизированы");

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту: ${PORT}`);
    });
  } catch (e) {
    console.log(`Произошла ошибка при запуске сервера: ${e.message}`);
  }
};

startServer();
