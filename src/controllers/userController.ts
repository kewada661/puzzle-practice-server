import type { Request, Response } from "express";
import { userService } from "../services/index.js";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);
    const profile = await userService.getProfile(user_id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "User not found."});
  }
}

export const getTimes = async (req: Request, res: Response) => {
  
}

export const updateTimes = async (req: Request, res: Response) => {

}

export const getGrades = async (req: Request, res: Response) => {
  
}

export const updateGrades = async (req: Request, res: Response) => {
  
}

export const getAlgorithms = async (req: Request, res: Response) => {
  
}

export const updateAlgorithms = async (req: Request, res: Response) => {
  
}

