const express = require("express");
const router = express.Router();
const upload = require("../upload/upload-img");
const controller = require("../controller/mainController");

router.get("/", controller.homepage);

router.get("/viewmore", controller.viewmore);

router.get("/modifyblog", controller.modifyblog);

router.post("/search", controller.searchblog);

router.post("/postblog", upload.single("image"), controller.postblog);

router.get("/:id", controller.viewblog);


module.exports = router;
