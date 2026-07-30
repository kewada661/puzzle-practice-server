import type { Request, Response } from "express";

export const handleError = (error: unknown, req: Request, res: Response) => {
  console.error(error);
  if (error instanceof Error) {
    res.status(error.status ?? 400).json({ message: error.message });
  } else {
    res.status(500).json({ message: `Internal server error at ${req.baseUrl}`});
  }
}