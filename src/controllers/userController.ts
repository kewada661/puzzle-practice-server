import type { Request, Response } from "express";

import {
  userService,
  timeService,
  algorithmService,
  gradeService
} from "../services/index.js";

import { handleError } from "../utils/index.js"

export const getProfile = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  try {
    const profile = await userService.getProfile(user_id);
    res.json(profile);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const getTimes = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.query.case_id);
  const option = String(req.query.option);
  const payload = req.user;
  try {
    const times = await timeService.getTimes(user_id, case_id, option);
    res.json(times);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const postTimes = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.body.case_id);
  const ms_elapsed = Number(req.body.ms_elapsed);
  try {
    await timeService.postTimes(user_id, case_id, ms_elapsed);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const patchTimes = async (req: Request, res: Response) => {
  const time_id = Number(req.body.time_id);
  const ms_elapsed = Number(req.body.ms_elapsed);
  try {
    await timeService.patchTimes(time_id, ms_elapsed);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const deleteTimes = async (req: Request, res: Response) => {
  const time_id = Number(req.query.time_id);
  try {
    await timeService.deleteTimes(time_id);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const getGrades = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.query.case_id);
  try {
    const grades = await gradeService.getGrades(user_id, case_id);
    res.json(grades);
  } catch (error) {
    handleError(error, req, res)
  }
}

export const upsertGrades = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.body.case_id);
  const grade = Number(req.body.grade);
  try {
    await gradeService.upsertGrades(user_id, case_id, grade);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const getAlgorithms = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.query.case_id);
  try {
    const algorithms = await algorithmService.getAlgorithms(user_id, case_id);
    res.json(algorithms);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const postAlgorithms = async (req: Request, res: Response) => {
  const user_id = Number(req.params.user_id);
  const case_id = Number(req.body.case_id);
  const algorithm = String(req.body.algorithm);
  try {
    await algorithmService.postAlgorithms(user_id, case_id, algorithm);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const patchAlgorithms = async (req: Request, res: Response) => {
  const alg_id = Number(req.body.alg_id);
  const algorithm = String(req.body.algorithm);
  try {
    await algorithmService.patchAlgorithms(alg_id, algorithm);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const deleteAlgorithms = async (req: Request, res: Response) => {
  const alg_id = Number(req.query.alg_id);
  try {
    await algorithmService.deleteAlgorithms(alg_id);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

