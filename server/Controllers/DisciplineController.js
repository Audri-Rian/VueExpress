const Course = require("../models/Course");
const Discipline = require("../models/Discipline");
const mongoose = require("mongoose");

// Criar disciplina
exports.createDiscipline = async (req, res) => {
  try {
    const { name, cursoId } = req.body;
    if (!name || !cursoId) {
      return res.status(400).json({ error: "Nome e cursoId são obrigatórios" });
    }
    if (!mongoose.Types.ObjectId.isValid(cursoId)) {
      return res.status(400).json({ error: "ID do curso inválido" });
    }
    const discipline = await Discipline.create({
      name,
      cursoId,
    });

    await Course.findByIdAndUpdate(cursoId, {
      $push: { disciplines: discipline._id },
    });
    res.status(201).json(discipline);
  } catch (error) {
    console.log("erro ao criar disciplina: ", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: error.message });
    }
    res.status(500).json({ error: "erro interno ao criar disciplina" });
  }
};

// Listar todas as disciplinas
exports.getAllDisciplines = async (req, res) => {
  try {
    const disciplines = await Discipline.find()
      .populate({
        path: 'cursoId',
        select: 'title code'
      });
    res.json(disciplines);
  } catch (error) {
    console.log("erro ao buscar disciplina", error);
    res.status(500).json({ error: "Erro interno ao listar disciplinas" });
  }
};

// Buscar disciplina por ID
exports.getDisciplineById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID da disciplina inválido" });
    }
    const discipline = await Discipline.findById(id).populate("cursoId");
    if (!discipline) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }
    res.json(discipline);
  } catch (error) {
    console.log("erro ao buscar disciplina: ", error);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID da disciplina inválido" });
    }
    res.status(500).json({ error: "erro interno ao buscar disciplina" });
  }
};

// Atualizar disciplina
exports.updateDiscipline = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cursoId } = req.body;
    if (!name || !cursoId) {
      return res.status(400).json({ error: "Nome e cursoId são obrigatórios" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID da disciplina inválido" });
    }
    if (!mongoose.Types.ObjectId.isValid(cursoId)) {
      return res.status(400).json({ error: "ID do curso inválido" });
    }
    const discipline = await Discipline.findByIdAndUpdate(
      req.params.id,
      { name, cursoId },
      { new: true }
    );
    if (!discipline) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }
    res.json(discipline);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Dados inválidos", details: error.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID inválido" });
    }
    res.status(400).json({ error: "Erro interno ao atualizar disciplina" });
  }
};

// Deletar disciplina
exports.deleteDiscipline = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID da disciplina inválido" });
    }
    const discipline = await Discipline.findByIdAndDelete(id);
    if (!discipline) {
      return res.status(404).json({ error: "Disciplina não encontrada" });
    }
    res.json({ message: "Disciplina removida com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar disciplina:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "ID da disciplina inválido" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Buscar disciplinas por curso
exports.getDisciplinesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "ID do curso inválido" });
    }
    const disciplines = await Discipline.find({ cursoId: courseId })
      .populate({
        path: 'cursoId',
        select: 'title code'
      });
    res.json(disciplines);
  } catch (error) {
    console.error("Erro ao buscar disciplinas do curso:", error);
    res.status(500).json({ error: "Erro interno ao buscar disciplinas do curso" });
  }
};
