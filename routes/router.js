import express from "express";
const router = express.Router();
// Require controller modules
import * as eachListController from "../controllers/each-list.js"

router.post("/", eachListController.createList)
router.get("/:id", eachListController.renderListName,eachListController.renderItem)
router.put("/:id", eachListController.updateListName)
router.post("/:id", eachListController.addItem)

export {router}
