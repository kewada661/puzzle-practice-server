import { pool } from "./database.js";

export interface Grade {
  user_id: number;
  case_id: number;
  grade: number;
}
export const upsertGrades = async (user_id: number, case_id: number, grade: number) => {
  pool.query(
    `
    INSERT INTO grades
    (user_id, case_id, grade)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
    grade = VALUES(grade)
    `,
    [
      user_id,
      case_id,
      grade
    ]
  )
}