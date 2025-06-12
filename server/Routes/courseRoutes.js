const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/CourseController");

router.post("/", courseController.create);
router.get("/", courseController.findAll);
router.get("/:id", courseController.findOne);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.remove);

module.exports = router;
