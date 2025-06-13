const express = require("express");
const router = express.Router();
const notesController = require("../Controllers/NotesController");

router.post("/", notesController.createNote);
router.get("/course/:courseId/discipline/:disciplineId", notesController.getNotesByCourseAndDiscipline);
router.get("/student/:studentId", notesController.getNotesByStudent);
router.post("/bulk", notesController.bulkUpdateNotes);

module.exports = router; 