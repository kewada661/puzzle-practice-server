import type { Request, Response } from "express";

import { gradeService } from "../services/index.js";

import { handleError } from "../utils/index.js"

export const getUserGrades = async (req: Request, res: Response) => {
  console.log("GET: /grades");
  const user_id = Number(req.cookies.user_id);
  try {
    const grades = await gradeService.getGradesByUserID(user_id);
    res.json(grades);
  } catch (error) {
    console.log("CAUGHT IN getUserGrades");
    handleError(error, req, res);
  }
}

export const getGrade = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  try {
    const grades = await gradeService.getGradesByCaseID(user_id, case_id);
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
