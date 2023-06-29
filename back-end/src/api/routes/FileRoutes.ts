import express from "express";
import * as FileController from "../controllers/FileController";

const router = express.Router();

router.get("/users", FileController.indexController);
router.post("/files", FileController.createController);

export default router;
