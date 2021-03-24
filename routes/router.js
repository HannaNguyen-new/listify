const express = require("express");
const router = express.Router();
// Require controller modules
const eachListController = require("../controllers/each-list")

router.post("/", eachListController.createList)
router.get("/:id", function(req,res){
    res.render("../views/pages/each-list-page.ejs")
})
module.exports = router;