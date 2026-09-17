import { userRepo } from "../db/index.js";

export const getProfile = async (user_id: number) => {
    const user = await userRepo.getUserById(user_id);
    if (!user) {
      throw new StatusError("User not found", 404);
    }
    return user;
  
}