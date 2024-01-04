import express from "express";
import { createUser, deleteUser, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);

router.route("/:id").get(getUser).delete(deleteUser);

export default router;
