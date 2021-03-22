const express = require("express");
const router = express.Router();
// Require controller modules
const eachListController = require("../controllers/each-list")

router.post("/", eachListController.createList)

module.exports = router;