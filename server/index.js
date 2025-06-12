require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("./database/testConnection");
const teacherRoutes = require("./Routes/teacherRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const classRoutes = require("./Routes/classRoutes");
const courseRoutes = require("./Routes/courseRoutes");
const disciplineRoutes = require("./Routes/disciplineRoutes");
const frequencyRoutes = require("./Routes/frequencyRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { cpf } = require("cpf-cnpj-validator");
const statsRoutes = require("./routes/stats");

//conectar ao mongoDB
connectToDatabase();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/disciplines", disciplineRoutes);
app.use("/api/frequencies", frequencyRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api", statsRoutes);

//inicia o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
