import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/oauth.routes.js";
import bracketRouter from "./routes/bracket.routes.js";
import pool from "./db.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json()); //get req.body

//routes
app.use("/oauth", authRouter);
app.use("/api/bracket", bracketRouter);

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

app.post("/api", async (req, res) => {
  try {
    const { id } = req.body;
    const query = await pool.query("INSERT INTO usr (id) VALUES ($1)", [id]);

    res.json(query);
  } catch (err) {
    console.log(err.message);
  }
});

//listen for requests
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
