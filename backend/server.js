import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/oauth.routes.js";
import bracketRouter from "./routes/bracket.routes.js";
import resultRouter from "./routes/result.routes.js";
import userRouter from "./routes/user.routes.js";
import spotifyRouter from "./routes/spotify.routes.js";
import auth from "./middleware/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json()); //get req.body

//routes
app.use("/oauth", authRouter);
app.use("/spotify", auth, spotifyRouter);
app.use("/api/bracket", bracketRouter);
app.use("/api/result", resultRouter);
app.use("/api/user", userRouter);

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

//listen for requests
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
