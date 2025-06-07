const express = require("express");
const router = express.Router();
const teacherController = require("../Controllers/TeacherController");

router.post("/loginProfessor", teacherController.login);
router.post("/registerProfessor", teacherController.register);
router.get("/teachers", teacherController.findAll);
router.put("/teachers/:id", teacherController.update);
router.delete("/teachers/:id", teacherController.delete);

module.exports = router;
