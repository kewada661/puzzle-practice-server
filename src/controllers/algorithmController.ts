import type { Request, Response } from "express";

import { algorithmService } from "../services/index.js";

import { handleError } from "../utils/index.js"

export const getAlgorithms = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  try {
    const algorithms = await algorithmService.getAlgorithms(user_id, case_id);
    res.json(algorithms);
  } catch (error) {
    handleError(error, req, res);
  }
}

export const postAlgorithms = async (req: Request, res: Response) => {
  const user_id = Number(req.cookies.user_id);
  const case_id = Number(req.params.case_id);
  const algorithm = String(req.body.algorithm);
  try {
    await algorithmService.postAlgorithms(user_id, case_id, algorithm);
    res.json({ message: "OK"});
  } catch (error) {
    handleError(error, req, res);
  }
}

export const patchAlgorithms = async (req: Request, res: Response) => {
  const alg_id = Number(req.params.alg_id);
  const algorithm = String(req.body.algorithm);
  try {
    await algorithmService.patchAlgorithms(alg_id, algorithm);
    res.json({ message: "OK"});
  } catch (error) {
    handleError(error, req, res);
  }
}

export const deleteAlgorithms = async (req: Request, res: Response) => {
  const alg_id = Number(req.params.alg_id);
  try {
    await algorithmService.deleteAlgorithms(alg_id);
    res.json({ message: "OK"});
  } catch (error) {
    handleError(error, req, res);
  }
}