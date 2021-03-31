import express from "express";
const router = express.Router();
// Require controller modules
import * as eachListController from "../controllers/each-list.js"

router.post("/", eachListController.createList)
router.get("/:id", eachListController.renderAll)
router.post("/:id", eachListController.addItem)
router.put("/:id", eachListController.updateListName)

export {router}
