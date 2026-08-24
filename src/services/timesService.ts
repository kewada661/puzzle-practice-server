import { timeRepo } from "../db/index.js";

export const getTimes = async (user_id: number, case_id: number) => {
  let times;
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }
  times = await timeRepo.getTimesByCaseId(user_id, case_id);

  if (!times) {
    throw new StatusError("Times not found", 404);
  }
  return times;
}

export const getAverage = async (user_id: number, case_id: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }
  const avg = await timeRepo.getAverageByCaseId(user_id, case_id);

  if (avg.length === 0) {
    return [{ ms_elapsed: undefined }];
  }
  return avg;
}

export const getBest = async (user_id: number, case_id: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400);
  }
  const best = await timeRepo.getBestByCaseId(user_id, case_id);

  if (best.length === 0) {
    return [{ ms_elapsed: undefined }];
  }
  return best;
}

export const postTimes = async (user_id: number, case_id: number, ms_elapsed: number) => {
  if (!user_id || !case_id) {
    throw new StatusError("Missing user ID or case ID", 400)
  }
  if (Number.isNaN(ms_elapsed)) {
    throw new StatusError("ms_elapsed is NaN", 400);
  }
  timeRepo.insertTimes(user_id, case_id, ms_elapsed);
}

export const patchTimes = async (time_id: number, ms_elapsed: number) => {
  if (!time_id) {
    throw new StatusError("Missing time ID, user ID, or case ID", 400);
  }
  if (Number.isNaN(ms_elapsed)) {
    throw new StatusError("ms_elapsed is NaN", 400);
  }
  timeRepo.updateTimes(time_id, ms_elapsed);
}

export const deleteTimes = async (time_id: number) => {
  if (!time_id) {
    throw new StatusError("Missing time ID", 400);
  }
  timeRepo.deleteTimes(time_id);
}