const express = require("express");
const router = express.Router();
const controller = require("../controller/deleteController");

router.get("/:id", controller.deleteblog);

module.exports = router;
