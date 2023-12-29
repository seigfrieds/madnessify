import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
