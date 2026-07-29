import type { Request, Response } from "express";
import { authService } from "../services/index.js";

export const logIn = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const result = await authService.logIn(username, password);
    res.cookie("user_id", result.user_id, {
      httpOnly: true
    }).cookie("access_token", result.access_token, {
      httpOnly: true 
    }).cookie("refresh_token", result.refresh_token, {
      httpOnly: true
    }).sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: (error instanceof Error) ? (error.message) : "Error at /auth/login" });
  }
}

export const logOut = (req: Request, res: Response) => {
  res.clearCookie("user_id")
  .clearCookie("access_token")
  .clearCookie("refresh_token")
  .sendStatus(200);
}

export const refresh = async (req: Request, res: Response) => {
  const user_id = req.cookies.user_id;
  const refresh_token = req.cookies.refresh_token;
  console.log("refresh_token: ", refresh_token);
  try {
    const result = await authService.refreshToken(user_id, refresh_token);
    if (!result) {
      throw new Error("Invalid refresh token");
    }
    res.cookie("access_token", result.access_token, {
      httpOnly: true
    }).cookie("refresh_token", result.refresh_token, {
      httpOnly: true
    }).sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: (error instanceof Error) ? (error.message) : "Error at /auth/refresh" });
  }
}