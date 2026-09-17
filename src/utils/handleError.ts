import type { Request, Response } from "express";

export class StatusError extends Error {
  status?: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

(globalThis as any).StatusError = StatusError;

export const handleError = (error: unknown, req: Request, res: Response) => {
  let status = 400;
  if (error instanceof Error) {
    if (error.name === "TokenExpiredError") status = 401
    res.status(error.status ?? status).json({
      name: error.name,
      message: error.message
    });
  } else {
    res.status(500).json({ message: `Internal server error at ${req.baseUrl}` });
  }
}