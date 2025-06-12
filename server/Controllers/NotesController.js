const Note = require("../models/Notes");
const mongoose = require("mongoose");

// Criar nota
exports.createNote = async (req, res) => {
  try {
    const { student, course, discipline, grade1, grade2, finalGrade, status } = req.body;
    
    if (!student || !course || !discipline) {
      return res.status(400).json({ error: "Aluno, curso e disciplina são obrigatórios" });
    }

    const note = await Note.create({
      student,
      course,
      discipline,
      grade1,
      grade2,
      finalGrade,
      status
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    res.status(500).json({ error: "Erro interno ao criar nota" });
  }
};

// Buscar notas por curso e disciplina
exports.getNotesByCourseAndDiscipline = async (req, res) => {
  try {
    const { courseId, disciplineId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(disciplineId)) {
      return res.status(400).json({ error: "IDs inválidos" });
    }

    const notes = await Note.find({
      course: courseId,
      discipline: disciplineId
    }).populate('student', 'name registration');

    res.json(notes);
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    res.status(500).json({ error: "Erro interno ao buscar notas" });
  }
};

// Buscar notas por aluno
exports.getNotesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "ID do aluno inválido" });
    }

    const notes = await Note.find({ student: studentId })
      .populate('course', 'title')
      .populate('discipline', 'name');

    res.json(notes);
  } catch (error) {
    console.error("Erro ao buscar notas do aluno:", error);
    res.status(500).json({ error: "Erro interno ao buscar notas do aluno" });
  }
};

// Atualizar notas em lote
exports.bulkUpdateNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({ error: "Dados de notas inválidos" });
    }

    const updatedNotes = await Promise.all(
      notes.map(async (noteData) => {
        const { student, course, discipline, grade1, grade2, finalGrade, status } = noteData;

        const note = await Note.findOneAndUpdate(
          { student, course, discipline },
          { grade1, grade2, finalGrade, status },
          { new: true, upsert: true }
        );

        return note;
      })
    );

    res.json(updatedNotes);
  } catch (error) {
    console.error("Erro ao atualizar notas em lote:", error);
    res.status(500).json({ error: "Erro interno ao atualizar notas em lote" });
  }
};
