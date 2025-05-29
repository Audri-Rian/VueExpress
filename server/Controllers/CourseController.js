const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { course: courseId, title, description, code, duration } = req.body;

    if (!title || !code) {
      return res
        .status(400)
        .json({ error: "Titulo e código do curso são obrigatórios" });
    }

    const existingRecord = await Course.findOne({
      course: courseId,
      title,
      code,
    });

    if (existingRecord) {
      return res.status(400).json({
        error: "Já existe um curso registrado com esse nome e código",
      });
    }

    const newCourse = await Course.create({
      course: courseId,
      title,
      description,
      code,
      duration,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("erro ao criar curso", error);

    if (error.name == "ValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
      });
    }

    if (error.code == 11000) {
      return res.status(400).json({
        error: "Registro duplicado para Titulo ou código de curso",
      });
    }

    res.status(500).json({ error: "Erro interno ao criar curso" });
  }
};

//criar o restante
