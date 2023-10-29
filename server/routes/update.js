const express = require("express");
const router = express.Router();
const upload = require("../upload/upload-img");
const controller = require("../controller/updateController");
const { route } = require(".");


router.get("/:id", controller.updateblog);

router.post("/:id", upload.single("image"), controller.updateblogpost);

module.exports = router;