import express from "express";
import { algorithmController } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const algorithmsRouter = express.Router();

algorithmsRouter.use(authenticateToken);

algorithmsRouter.get('/:case_id', algorithmController.getAlgorithms);
algorithmsRouter.post('/:case_id', algorithmController.postAlgorithms);
algorithmsRouter.patch('/:alg_id', algorithmController.patchAlgorithms)
algorithmsRouter.delete('/:alg_id', algorithmController.deleteAlgorithms)

export default algorithmsRouter;