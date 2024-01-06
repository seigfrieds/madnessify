import express from "express";
import { callback, login, check } from "../controllers/oauth.controller.js";

const router = express.Router();

router.get("/login", login);

router.get("/callback", callback);

router.get("/check", check);

export default router;
