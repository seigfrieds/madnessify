import express from "express";
import { callback, login } from "../controllers/oauth.controller.js";

const router = express.Router();

router.get("/login", login);

router.get("/callback", callback);

export default router;
