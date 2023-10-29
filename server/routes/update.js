const express = require("express");
const router = express.Router();
const upload = require("../upload/upload-img");
const controller = require("../controller/updateController");
const middleware = require("../middleware/middleware");
const { route } = require(".");


router.get("/:id", middleware.isAlreadyLogin, controller.updateblog);

router.post("/:id", middleware.isAlreadyLogin, upload.single("image"), controller.updateblogpost);

module.exports = router;