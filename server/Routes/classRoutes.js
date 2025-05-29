const express = require("express");
const router = express.Router();
const classController = require("../Controllers/ClassController");

router.post("/class", classController.create);
router.get("/classes", classController.findAll);
router.get("/classes/:id", classController.findById);
router.put("/class/:id", classController.update);
router.delete("/class/:id", classController.delete);

module.exports = router;
