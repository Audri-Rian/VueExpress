const express = require("express");
const router = express.Router();
const classController = require("../Controllers/ClassController");

router.post("/", classController.create);
router.get("/", classController.findAll);
router.get("/:id", classController.findById);
router.put("/:id", classController.update);
router.delete("/:id", classController.delete);

module.exports = router;
