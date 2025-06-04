const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("./database/testConnection");
const teacherRoutes = require("../server/Routes/teacherRoutes");
const studentRoutes = require("../server/Routes/studentRoutes");
const classRoutes = require("../server/Routes/classRoutes");
const courseRoutes = require("../server/Routes/courseRoutes");

//conectar ao mongoDB
connectToDatabase();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);
app.use("/api", classRoutes);
app.use("/api", courseRoutes);

//inicia o servidorr
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
