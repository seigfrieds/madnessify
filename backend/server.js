import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/oauth.routes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

//routes
app.use("/oauth", authRouter);

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

//listen for requests
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
