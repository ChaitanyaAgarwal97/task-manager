const express = require("express");

const controller = require("./controller.js");

const router = express.Router();



router.get("/", controller.getAllTasks);
router.delete("/delete", controller.deleteTask);
router.patch("/update", controller.markTask);
router.post("/create", controller.createTask);

module.exports = router;