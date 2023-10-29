const express = require("express");
const router = express.Router();
const controller = require("../controller/dashboardController");
const middleware = require("../middleware/middleware");

router.use(express.static("public"));

router.get("/home", middleware.isAlreadyLogin, controller.homepage);

router.get("/myblogs", middleware.isAlreadyLogin, controller.myblogspage);

router.get("/logout", controller.logout);

module.exports = router;