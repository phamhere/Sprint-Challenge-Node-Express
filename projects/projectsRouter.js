const express = require("express");
const projectDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/");

module.exports = router;
