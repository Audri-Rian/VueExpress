const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectToDatabase = require("./testConnection");
const teacherRoutes = require("../server/Routes/teacherRoutes");
const studentRoutes = require("../server/Routes/studentRoutes");

//conectar ao mongoDB
connectToDatabase();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);

//inicia o servidorr
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
