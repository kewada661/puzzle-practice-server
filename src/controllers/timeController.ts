import type { Request, Response } from "express";

import { timeService } from "../services/index.js";

import { handleError } from "../utils/index.js"

export const getTimes = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  const option = String(req.query.option);
  const payload = req.user;
  try {
    const times = await timeService.getTimes(user_id, case_id);
    res.json(times);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const getAverage = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  try {
    const average = await timeService.getAverage(user_id, case_id);
    res.json(average[0]);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const getBest = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  try {
    const best = await timeService.getBest(user_id, case_id);
    res.json(best[0]);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const postTimes = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  const ms_elapsed = Number(req.body.ms_elapsed);
  try {
    await timeService.postTimes(user_id, case_id, ms_elapsed);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const patchTimes = async (req: Request, res: Response) => {
  const time_id = Number(req.params.time_id);
  const ms_elapsed = Number(req.body.ms_elapsed);
  try {
    await timeService.patchTimes(time_id, ms_elapsed);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const deleteTimes = async (req: Request, res: Response) => {
  const time_id = Number(req.params.time_id);
  try {
    await timeService.deleteTimes(time_id);
    res.sendStatus(200);
  } catch (error) {
    handleError(error, req, res);
  }
}
