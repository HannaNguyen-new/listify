const express = require("express");
const router = express.Router();
// Require controller modules
const eachListController = require("../controllers/each-list")

router.post("/", eachListController.createList)
router.get("/:id", eachListController.renderListName)
router.put("/:id", eachListController.updateListName)
module.exports = router;