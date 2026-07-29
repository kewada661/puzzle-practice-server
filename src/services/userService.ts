import { userRepo } from "../db/index.js";

export const getProfile = async (user_id: number) => {
    const user = await userRepo.getUserById(user_id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  
}