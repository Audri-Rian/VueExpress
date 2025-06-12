const express = require("express");
const router = express.Router();
const disciplineController = require("../Controllers/DisciplineController");

router.post("/", disciplineController.createDiscipline);
router.get("/", disciplineController.getAllDisciplines);
router.get("/course/:courseId", disciplineController.getDisciplinesByCourse);
router.get("/:id", disciplineController.getDisciplineById);
router.put("/:id", disciplineController.updateDiscipline);
router.delete("/:id", disciplineController.deleteDiscipline);

module.exports = router;
