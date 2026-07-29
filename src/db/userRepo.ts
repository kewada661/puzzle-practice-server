import { pool } from "./database.js";

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  refresh_token: string;
}

export const getUserById = async (user_id: number) => {
  const [result] = await pool.query(
		`
    SELECT user_id, username, email
    FROM users
    WHERE user_id = ${user_id}
		`
	);
  const users = result as User[];
  return users[0] ?? null;
}

export const getUserByUsername = async (username: string) => {
  const [result] = await pool.query(
		`
		SELECT user_id, password
		FROM users
		WHERE username = '${username}'
  	`
	);
  const users = result as User[];
  return users[0] ?? null;
}

export const getRefreshTokenById = async (user_id: number) => {
  const [result] = await pool.query(
		`
    SELECT refresh_token
    FROM users
    WHERE user_id = ${user_id}
  	`
	);
	const users = result as User[];
  const user = users[0];
  return user!.refresh_token ?? null;
}

export const updateRefreshToken = async (user_id: number, refresh_token: string) => {
  const [result] = await pool.query(
		`
    UPDATE users
    SET refresh_token = '${refresh_token}' 
    WHERE user_id = ${user_id}
  	`
	);

	console.log(result); 
}

export const deleteRefreshToken = async (user_id: number) => {
	const [result] = await pool.query(
		`
    UPDATE users
    SET refresh_token = NULL 
    WHERE user_id = ${user_id}
		`
	)

	console.log(result);
}