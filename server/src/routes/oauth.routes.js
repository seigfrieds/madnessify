import express from "express";
import { callback, login } from "../controllers/oauth.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/login", login);

router.get("/callback", callback);

router.get("/check", auth, (req, res) => {
  //should have auth middleware --> if it gets to this point, its a valid session
  res.sendStatus(200);
});

export default router;
