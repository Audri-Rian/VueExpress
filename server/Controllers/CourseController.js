const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { title, description, code, periods } = req.body;

    if (!title || !code || !periods) {
      return res
        .status(400)
        .json({
          error:
            "Título, código e número de períodos do curso são obrigatórios",
        });
    }

    const existingRecord = await Course.findOne({ title, code });

    if (existingRecord) {
      return res.status(400).json({
        error: "Já existe um curso registrado com esse nome e código",
      });
    }

    const newCourse = await Course.create({
      title,
      description,
      code,
      periods,
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
    const course = await Course.findById(req.params.id).populate("classes");
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
    const { title, description, code, periods } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        code,
        periods,
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

// Buscar alunos por curso
exports.getStudentsByCourse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID do curso recebido:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('ID do curso inválido');
      return res.status(400).json({ error: "ID do curso inválido" });
    }

    // Buscar alunos diretamente pelo curso
    const Student = require('../models/Student');
    const students = await Student.find({ course: id })
      .select('name registration');

    console.log('Total de alunos encontrados:', students.length);
    res.json(students);
  } catch (error) {
    console.error("Erro ao buscar alunos do curso:", error);
    res.status(500).json({ error: "Erro interno ao buscar alunos do curso" });
  }
};

//criar o restante
