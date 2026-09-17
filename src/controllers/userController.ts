import type { Request, Response } from "express";

import { userService } from "../services/index.js";

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

export const postUser = async (req: Request, res: Response) => {
  const status = 500;
  const error = new StatusError("Function is not implemented", 500);
  handleError(error, req, res);
}
