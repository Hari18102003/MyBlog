const express = require("express");
const router = express.Router();
const upload = require("../upload/upload-img");
const controller = require("../controller/mainController");
const middleware = require("../middleware/middleware");

router.get("/", middleware.isLogin, controller.homepage);

router.get("/viewmore", middleware.isAlreadyLogin, controller.viewmore);

router.get("/modifyblog", middleware.isAlreadyLogin, controller.modifyblog);

router.get("/login", middleware.isLogin, controller.loginpage);

router.get("/register", controller.registerpage);

router.post("/register", controller.registeruser);

router.post("/login", controller.loginuser);

router.post("/search", middleware.isAlreadyLogin, controller.searchblog);

router.post("/postblog", middleware.isAlreadyLogin, upload.single("image"), controller.postblog);

router.get("/:id", middleware.isAlreadyLogin, controller.viewblog);


module.exports = router;
