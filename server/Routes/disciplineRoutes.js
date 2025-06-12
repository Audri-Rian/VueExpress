const express = require("express");
const router = express.Router();
const disciplineController = require("../controllers/disciplineController");

router.post("/", disciplineController.createDiscipline);
router.get("/", disciplineController.getAllDisciplines);
router.get("/:id", disciplineController.getDisciplineById);
router.put("/:id", disciplineController.updateDiscipline);
router.delete("/:id", disciplineController.deleteDiscipline);

module.exports = router;
