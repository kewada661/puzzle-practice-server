import { pool } from "./database.js";

export interface Time {
  ms_elapsed: number,
  user_id: number,
  case_id: number
}
export const getTimesById = async (user_id: number) => {
  const [result] = await pool.query(
    `
    SELECT ms_elapsed
    FROM times
    WHERE user_id = ?
    `,
    [user_id]
  );
  const times = result as Time[];
  return times;
}

export const getTimesByCaseId = async (user_id: number, case_id: number) => {
  const [result] = await pool.query(
    `
    SELECT ms_elapsed
    FROM times
    WHERE (user_id, case_id) = (?, ?)
    `,
    [user_id, case_id]
  )
  const times = result as Time[];
  return times;
}

export const insertTimes = async (user_id: number, case_id: number, ms_elapsed: number) => {
  pool.query(
    `
    INSERT INTO times
    (user_id, case_id, ms_elapsed)
    VALUES (?, ?, ?)
    `,
    [
      user_id,
      case_id,
      ms_elapsed
    ]
  );
}

export const updateTimes = async (time_id: number, ms_elapsed: number) => {
  pool.query(
    `
    UPDATE times
    SET ms_elapsed = ?
    WHERE time_id = ?
    `,
    [ms_elapsed, time_id]
  )
}

export const deleteTimes = async (time_id: number) => {
  pool.query(
    `
    DELETE FROM times
    WHERE time_id = ?
    `,
    [time_id]
  )
}
