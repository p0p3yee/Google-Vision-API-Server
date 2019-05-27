const ocrHandler = require("../Handlers/ocr")
const express = require("express");

const router = express.Router();

router.post("/ocr", ocrHandler);

module.exports = router