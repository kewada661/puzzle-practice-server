import express from "express";
import { gradeController } from "../controllers/index.js";
import { authenticateToken } from "../middleware/index.js";

const gradesRouter = express.Router();

gradesRouter.use(authenticateToken);

gradesRouter.get('/:case_id', gradeController.getGrades);
gradesRouter.post('/:case_id', gradeController.upsertGrades);
gradesRouter.patch('/:case_id', gradeController.upsertGrades);

export default gradesRouter;