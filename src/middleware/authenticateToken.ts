import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { access } from "node:fs";
import { handleError } from "../utils/index.js";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token;

  // Verify access_token. Attempt to refresh if expired.
  try {
    if (!access_token) {
      throw new Error("Missing token", 400);
    }
    const payload = jwt.verify(access_token, process.env.JWT_SECRET!);
    if (typeof payload === "string") {
      throw new Error("Invalid token", 401);
    }
    req.user = payload;
    next();
  } catch (error) {
    handleError(error, req, res);
  }
}