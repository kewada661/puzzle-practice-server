import { pool } from "./database.js";

export interface Grade {
  user_id: number;
  case_id: number;
  grade: number;
}

export const getGradesByCaseID = async (user_id: number, case_id: number) => {
  const [result] = await pool.query(
    `
    SELECT case_id, grade
    FROM grades
    WHERE (user_id, case_id) = (?, ?)
    `,
    [
      user_id,
      case_id,
    ]
  )

  const grades = result as Grade[];
  return grades;
}

export const getGradesByUserID = async (user_id: number) => {
  const [result] = await pool.query(
    `
    SELECT case_id, grade
    FROM grades
    WHERE user_id = ? 
    `,
    [
      user_id
    ]
  )

  const grades = result as Grade[];
  return grades;
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