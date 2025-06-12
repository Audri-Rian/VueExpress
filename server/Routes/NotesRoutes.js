const express = require("express");
const router = express.Router();
const notesController = require("../Controllers/NotesController");

// Criar uma nova nota
router.post("/", notesController.create);

// Buscar todas as notas
router.get("/", notesController.findAll);

// Buscar uma nota específica
router.get("/:id", notesController.findOne);

// Atualizar uma nota
router.put("/:id", notesController.update);

// Buscar notas por curso e disciplina
router.get("/course/:courseId/discipline/:disciplineId", notesController.getNotesByCourseAndDiscipline);

// Atualizar múltiplas notas
router.post("/bulk", notesController.bulkUpdate);

// Excluir uma nota
router.delete("/:id", notesController.delete);

module.exports = router;
