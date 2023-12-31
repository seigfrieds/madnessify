import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

//connect to postgres database
const pool = new pg.Pool({
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || "postgres",
});

export default pool;
