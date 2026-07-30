import type { Request, Response } from "express";

import { gradeService } from "../services/index.js";

import { handleError } from "../utils/index.js"

export const getGrades = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  try {
    const grades = await gradeService.getGrades(user_id, case_id);
    res.json(grades);
  } catch (error) {
    handleError(error, req, res)
  }
}

export const upsertGrades = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  const grade = Number(req.body.grade);
  try {
    await gradeService.upsertGrades(user_id, case_id, grade);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}
