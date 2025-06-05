const express = require("express");
const router = express.Router();
const classController = require("../Controllers/ClassController");

router.post("/classes", classController.create);
router.get("/classes", classController.findAll);
router.get("/classes/:id", classController.findById);
router.put("/classes/:id", classController.update);
router.delete("/classes/:id", classController.delete);

module.exports = router;
