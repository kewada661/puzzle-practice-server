import jwt from "jsonwebtoken";
import crypto from "crypto";
import { userRepo } from "../db/index.js";

export const logIn = async (username: string, password: string) => {
  const user = await userRepo.getUserByUsername(username);

  if (!user || password !== user.password) {
    throw new Error("Invalid username or password", 200);
  }

  // Create a new refresh token
  const refresh_token = crypto.randomBytes(64).toString('hex');
  const hash = crypto.hash('sha1', refresh_token);
  userRepo.updateRefreshToken(user.user_id, hash);

  // Create a new access token
  const access_token = jwt.sign(
    {
      user_id: user.user_id
    },
    process.env.JWT_SECRET!,
    { 
      algorithm: "HS256",
      expiresIn: "15m",
    }
  )
  return {
    user_id: user.user_id,
    access_token: access_token,
    refresh_token: refresh_token
  };
}

export const logOut = (user_id: number) => {
  userRepo.deleteRefreshToken(user_id);
}

export const refreshToken = async (user_id: number, refresh_token: string) => {
  if (!refresh_token || !user_id) {
    throw new Error("Missing user id or refresh token", 400);
  }
  const db_token = await userRepo.getRefreshTokenById(user_id);
  const hash = crypto.hash('sha1', refresh_token);
  if ((db_token === null) || db_token !== hash) {
    throw new Error("Invalid refresh token", 401);
  }

  // Create a new refresh token
  const new_refresh_token = crypto.randomBytes(64).toString('hex');
  const new_hash = crypto.hash('sha1', new_refresh_token);
  userRepo.updateRefreshToken(user_id, new_hash);

  // Create new access token
  const access_token = jwt.sign(
    {
      user_id: user_id
    },
    process.env.JWT_SECRET!,
    { 
      algorithm: "HS256",
      expiresIn: "15m",
    }
  )
  return {
    access_token: access_token,
    refresh_token: new_refresh_token
  };
}
