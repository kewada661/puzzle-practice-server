import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

process.on('SIGINT', async () => {
  console.log("Closing db connection.");
  await pool.end();
  process.exit(0);
})

const testConnection = async () => {
  let conn
  try {
    conn = await pool.getConnection();
    await conn.ping();
    console.log("\'puzzle_practice\' connection is live!");
  } catch (error) {
    console.error(error);
    throw("Could not connect to \'puzzle_practice\'");
  } finally {
    conn?.release();
    pool?.end();
  }
}


