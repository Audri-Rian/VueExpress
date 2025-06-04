const Course = require("../models/Course");
const mongoose = require("mongoose");
const { populate } = require("../models/Frequency");

exports.create = async (req, res) => {
  try {
    const { course: courseId, title, description, code, duration } = req.body;

    if (!title || !code) {
      return res
        .status(400)
        .json({ error: "Titulo e código do curso são obrigatórios" });
    }

    const existingRecord = await Course.findOne({ title, code });

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

exports.findAll = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Erro ao buscar cursos", error);
    res.status(500).json({ error: "Erro interno ao buscar cursos" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.json(course);
  } catch (error) {
    console.error("Erro ao buscar curso", error);
    res.status(500).json({ error: "Erro interno ao buscar curso" });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, code, duration } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        code,
        duration,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error("Erro ao atualizar curso", error);
    res.status(500).json({ error: "Erro interno ao atualizar curso" });
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    res.json({ message: "Curso removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover curso", error);
    res.status(500).json({ error: "Erro interno ao remover curso" });
  }
};

//criar o restante
