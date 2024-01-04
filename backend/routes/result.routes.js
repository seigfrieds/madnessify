import express from "express";
import {
  createResult,
  getResult,
  deleteResult,
  updateResult,
} from "../controllers/result.controller.js";

const router = express.Router();

router.post("/", createResult);

router.route("/:id").get(getResult).delete(deleteResult).patch(updateResult);

export default router;
