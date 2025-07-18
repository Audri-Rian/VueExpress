const Class = require("../models/Class");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
  try {
    const requiredFields = ['name', 'course', 'period', 'year', 'shift'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Campos obrigatórios faltando: ${missingFields.join(', ')}` 
      });
    }

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    console.error("ERRO COMPLETO", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Dado duplicado",
      });
    }
    res.status(500).json({ error: "Erro ao criar turma" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("course")
      .populate("students");

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar turmas" });
  }
};

exports.findById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const classes = await Class.findById(id)
      .populate("course")
      .populate("students");

    if (!classes) {
      return res.status(404).json({ error: "Não foi encontrado nenhuma classe" });
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar turma" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const requiredFields = ['name', 'course', 'period', 'year', 'shift'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Campos obrigatórios faltando: ${missingFields.join(', ')}` 
      });
    }

    const updateClasses = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateClasses) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    return res.status(200).json(updateClasses);
  } catch (error) {
    console.error("erro ao atualizar turma: ", error);
    res.status(500).json({ error: "Erro ao atualizar turma" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const deleteClass = await Class.findByIdAndDelete(id);

    if (!deleteClass) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }

    return res.json({ message: "Turma deletada com sucesso" });
  } catch (error) {
    console.error("erro ao deletar turma: ", error);
    res.status(500).json({ error: "Erro ao deletar turma" });
  }
};
