import type { Request, Response } from "express";

export class StatusError extends Error {
  status?: number;
  constructor (message: string, status: number) {
    super(message);
    this.status = status
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

(globalThis as any).StatusError = StatusError;

export const handleError = (error: unknown, req: Request, res: Response) => {
  if (error instanceof Error) {
    console.log(error.status);
    console.error(error);
    res.status(error.status ?? 400).json({ message: error.message });
  } else {
    res.status(500).json({ message: `Internal server error at ${req.baseUrl}`});
  }
}