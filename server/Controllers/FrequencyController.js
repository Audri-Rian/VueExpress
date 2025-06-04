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

exports.findAll = async (req, res) => {
  try {
    const frequencies = await Frequency.find()
      .populate("class", "student")
      .sort({ date: -1 });

    if (!frequencies) {
      return res
        .status(404)
        .json({ error: "Não há nenhuma frequência registrada" });
    }

    res.status(200).json(frequencies);
  } catch (error) {
    console.error("Erro ao buscar frequências:", error);

    if (error.name === "CastError") {
      return res.status(500).json({
        error: "Erro ao carregar dados relacionados",
        details: "Verifique as referências de turma ou aluno",
      });
    }

    res.status(500).json({
      error: "Falha ao carregar registros de frequência",
      suggestion:
        "Tente novamente mais tarde ou verifique a conexão com o banco de dados",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const frequency = await Frequency.findById(id).populate("class", "student");

    if (!frequency) {
      return res.status(404).json({ error: "Frequência não encontrada" });
    }

    res.status(200).json(frequency);
  } catch (error) {
    console.error("Erro ao buscar frequência por ID:", error);
    res.status(500).json({ error: "Erro interno ao buscar frequência" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const updatedFrequency = await Frequency.findByIdAndUpdate(
      id,
      { status, date },
      { new: true, runValidators: true }
    );

    if (!updatedFrequency) {
      return res.status(404).json({ error: "Frequência não encontrada" });
    }

    res.status(200).json(updatedFrequency);
  } catch (error) {
    console.error("Erro ao atualizar frequência:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Erro de validação" });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Conflito de duplicidade: turma/aluno/data já existe",
      });
    }
    res.status(500).json({ error: "Erro interno ao atualizar frequência" });
  }
};
