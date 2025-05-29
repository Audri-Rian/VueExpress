const Student = require("../models/Student");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const students = await Student.find();

    return res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os alunos" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);

    return res.status(201).json("Aluno excluído com sucesso", student);
  } catch (error) {}
};

// implementar mais tratamentos deixando mais robusto as API´S
