const express = require("express");
const router = express.Router();
const studentController = require("../Controllers/StudentController");

router.post("/students", studentController.create);
router.get("/students/search", studentController.findOne);
router.get("/students", studentController.findAll);
router.put("/students/:id", studentController.update);
router.delete("/students/:id", studentController.delete);

module.exports = router;
