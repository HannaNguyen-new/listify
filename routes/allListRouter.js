import express from "express";
const allListsRouter = express.Router();
// require controller module 
import * as allListController from "../controllers/all-lists.js";

allListsRouter.get("/:id", function(req, res) {
    const id = req.params.id;
    res.json("/each-list/" + id)
})
allListsRouter.get("/", allListController.renderLists);

export default allListsRouter;