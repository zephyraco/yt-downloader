const express = require("express");
const router = express.Router();
const videoController = require("../controllers/index");

router.get("/get-info", videoController.getVideoInfo);
router.get("/download", videoController.download);

module.exports = router;
