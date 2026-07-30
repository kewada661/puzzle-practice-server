import { pool } from "./database.js";

export interface algorithm {
  user_id: number;
  case_id: number;
  algorithm: string;
}
export const getAlgorithmsByCaseID = async (user_id: number, case_id: number) => {
  const [result] = await pool.query(
    `
    SELECT algorithm
    FROM algorithms
    WHERE (user_id, case_id) = (?, ?)
    `,
    [user_id, case_id]
  )

  const algorithms = result as algorithm[];
  return algorithms;
}

export const insertAlgorithms = async (user_id: number, case_id: number, algorithm: string) => {
  pool.query(
    `
    INSERT INTO algorithms
    (user_id, case_id, algorithm)
    VALUES (?, ?, ?)
    `,
    [
      user_id,
      case_id,
      algorithm
    ]
  );
}

export const updateAlgorithms = async (alg_id: number, algorithm: string) => {
  pool.query(
    `
    UPDATE algorithms
    SET algorithm =  ?
    WHERE alg_id = ?
    `,
    [algorithm, alg_id]
  );
}

export const deleteAlgorithms = async (alg_id: number) => {
  pool.query(
    `
    UPDATE algorithms
    SET algorithm =  NULL
    WHERE alg_id = ?
    `,
    [alg_id]
  );
}