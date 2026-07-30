import { timeRepo } from "../db/index.js";

export const getTimes = async (user_id: number, case_id: number, option: string) => {
  let times;
  if (!user_id) {
    throw new Error("Missing user ID", 400);
  }
  if (case_id) {
    // Do something
    times = await timeRepo.getTimesByCaseId(user_id, case_id);
  } else {
    times = await timeRepo.getTimesById(user_id);
  }

  if (!times) {
    throw new Error("Times not found", 404);
  }
  return times;
}

export const postTimes = async (user_id: number, case_id: number, ms_elapsed: number) => {
  if (!user_id || !case_id) {
    throw new Error ("Missing user ID or case ID", 400)
  }
  if (Number.isNaN(ms_elapsed)) {
    throw new Error ("ms_elapsed is NaN", 400);
  }
  timeRepo.insertTimes(user_id, case_id, ms_elapsed);
}

export const patchTimes = async (time_id: number, ms_elapsed: number) => {
  if (!time_id) {
    throw new Error ("Missing time ID, user ID, or case ID", 400);
  }
  if (Number.isNaN(ms_elapsed)) {
    throw new Error ("ms_elapsed is NaN", 400);
  }
  timeRepo.updateTimes(time_id, ms_elapsed);
}

export const deleteTimes = async (time_id: number) => {
  if (!time_id) {
    throw new Error ("Missing time ID", 400);
  }
  timeRepo.deleteTimes(time_id);
}