import express from "express";
const allListsRouter = express.Router();
// require controller module 
import * as allListController from "../controllers/all-lists.js";

allListsRouter.get("/", allListController.renderLists);

export default allListsRouter;