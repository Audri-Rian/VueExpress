const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/StudentController");

router.post("/registerAluno", studentController.register);
router.get("/search", studentController.findOne);
router.get("/", studentController.findAll);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);

module.exports = router;
