import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/oauth.routes.js";
import bracketRouter from "./routes/bracket.routes.js";
import resultRouter from "./routes/result.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json()); //get req.body

//routes
app.use("/oauth", authRouter);
app.use("/api/bracket", bracketRouter);
app.use("/api/result", resultRouter);
app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

//listen for requests
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});