const express = require("express");
const router = express.Router();
const teacherController = require("../Controllers/TeacherController");

router.post("/loginProfessor", teacherController.login);
router.post("/registerProfessor", teacherController.register);
router.get("/", teacherController.findAll);
router.put("/:id", teacherController.update);
router.delete("/:id", teacherController.delete);

module.exports = router;
