const Frequency = require("../models/Frequency");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const { class: classId, student, date, status } = req.body;
    if (!classId || !student || !status) {
      return res
        .status(400)
        .json({ error: "Turma, aluno e status são obrigatórios" });
    }

    const existingRecord = await Frequency.findOne({
      class: classId,
      student,
      date: date || new Date(),
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ error: "Já existe frequência registrada nessa data" });
    }
    const newFrequency = await Frequency.create({
      class: classId,
      student,
      date: date || new Date(),
      status,
    });

    res.status(201).json(newFrequency);
  } catch (error) {
    console.error("erro ao criar frequencia", error);

    if (error.name == "ValidationError") {
      return res.status(400).json({
        error: "Erro de validação",
      });
    }

    if (error.code == 11000) {
      return res.status(400).json({
        error: "Registro duplicado para Aluno, Turma ou data",
      });
    }

    res.status(500).json({ error: "Erro interno ao criar frequencia" });
  }
};

// continuar o crud
exports.
