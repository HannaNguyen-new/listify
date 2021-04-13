import express from "express";
const allListsRouter = express.Router();
// require controller module 
import * as allListController from "../controllers/all-lists.js";

allListsRouter.get("/", allListController.renderLists)
allListsRouter.delete("/:id", allListController.deleteList)
export default allListsRouter;