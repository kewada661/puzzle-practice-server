import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { access } from "node:fs";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token;

  // Verify access_token. Attempt to refresh if expired.
  try {
    if (!access_token) {
      throw("Missing token");
    }
    const payload = jwt.verify(access_token, process.env.JWT_SECRET!);
    if (typeof payload === "string") {
      throw("Invalid token");
    }
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: (error instanceof Error) ? (error.message) : "Error authenticating access token" });
  }
}