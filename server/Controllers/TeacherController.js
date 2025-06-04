const Teacher = require("../models/Teacher.js");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.CPF ||
      !req.body.email ||
      !req.body.course
    ) {
      return res
        .status(400)
        .json({ message: "Nome, CPF, email e curso são obrigatórios!" });
    }
    const teacher = await Teacher.create(req.body);
    console.log("dados recebidos", req.body);

    return res.status(201).json(teacher);
  } catch (error) {
    console.error("ERRO COMPLETO", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Dado duplicado",
        details: "Email ou CPF já existente",
      });
    }

    res.status(500).json({
      error: "Erro ao criar professor",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (!teachers) {
      return res.status(404).json({ msg: "Nenhum professor encontrado" });
    }
    return res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
};

exports.update = async (req, res) => {
  const id = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }
    const teacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    return res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professor" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params;
  try {
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({ error: "Professor não encontrado" });
    }
    res.json({ message: "Professor deletado com sucesso" });
  } catch (error) {
    console.error("erro ao deletar professor:", error);
    res.status(500).json({ error: "Erro ao deletar professor" });
  }
};
