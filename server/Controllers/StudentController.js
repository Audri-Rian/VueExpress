const Student = require("../models/Student");
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
        .json({ msg: "Nome, cpf, email e curso são obrigatórios" });
    }
    const newStudent = await Student.create(req.body);
    console.log("dados recebidos", req.body);

    return res.status(201).json(newStudent);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Erro de validação", details: error.errors });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: "CPF ou e-mail já cadastrados" });
    }
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório para busca" });
    }

    const student = await Student.findOne({
      name: { $regex: name, $options: "i" },
    });

    if (!student) {
      return res
        .status(404)
        .json({ msg: "Nenhum aluno encontrado com esse nome" });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error("erro ao buscar por nome", error);

    res.status(500).json({ error: "erro interno ao buscar aluno" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const students = await Student.find();

    if (!students) {
      return res.status(404).json({ msg: "Nenhum aluno encontrado" });
    }

    return res.json(students);
  } catch (error) {
    console.error("erro interno", error);
    res.status(500).json({ error: "Erro ao listar os alunos" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Id fornecido não é válido" });
    }
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ msg: "Nenhum aluno encontrado" });
    }

    return res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ error: "nenhum aluno encontrado" });
    }

    return res.status(200).json("Aluno excluído com sucesso", student);
  } catch (error) {
    console.error("erro ao deletar aluno: ", erro);
    res.status(500).json({ error: "erro interno ao deletar aluno" });
  }
};
