const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/CourseController");

router.post("/courses", courseController.create);
router.get("/courses", courseController.findAll);
router.get("/courses/:id", courseController.findOne);
router.put("/courses/:id", courseController.update);
router.delete("/courses/:id", courseController.remove);

module.exports = router;
