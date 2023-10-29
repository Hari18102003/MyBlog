const express = require("express");
const router = express.Router();
const controller = require("../controller/deleteController");
const middleware = require("../middleware/middleware");

router.get("/:id", middleware.isAlreadyLogin, controller.deleteblog);

module.exports = router;
