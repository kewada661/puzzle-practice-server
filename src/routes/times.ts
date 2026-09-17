import express from "express";
import { timeController } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const timesRouter = express.Router();

timesRouter.use(authenticateToken);

timesRouter.get('/snapshot', timeController.getSnapshot);
timesRouter.get('/:case_id', timeController.getTimes);
timesRouter.get('/:case_id/average', timeController.getAverage);
timesRouter.get('/:case_id/best', timeController.getBest);
timesRouter.post('/:case_id', timeController.postTimes);
timesRouter.patch('/:time_id', timeController.patchTimes);
timesRouter.delete('/:time_id', timeController.deleteTimes);

export default timesRouter;