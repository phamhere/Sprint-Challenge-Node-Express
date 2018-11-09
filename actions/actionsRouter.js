const express = require("express");
const actionsDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/");

module.exports = router;
