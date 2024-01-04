import express from "express";
import {
  createBracket,
  deleteBracket,
  getBracket,
  updateBracket,
} from "../controllers/bracket.controller.js";
import {
  createBracketLike,
  deleteBracketLike,
  getBracketLikes,
} from "../controllers/bracket_like.controller.js";
import {
  createBracketSave,
  deleteBracketSave,
  getBracketSaves,
} from "../controllers/bracket_save.controller.js";
import {
  createBracketComment,
  deleteBracketComment,
  getBracketComments,
  updateBracketComment,
} from "../controllers/bracket_comment.controller.js";

const router = express.Router();

router.post("/", createBracket);

router.route("/:id").get(getBracket).delete(deleteBracket).patch(updateBracket);

router.route("/:bracketId/likes").post(createBracketLike).get(getBracketLikes);
router.delete("/:bracketId/likes/:userId", deleteBracketLike);

router.route("/:bracketId/saves").post(createBracketSave).get(getBracketSaves);
router.delete("/:bracketId/saves/:userId", deleteBracketSave);

router.route("/:bracketId/comments").post(createBracketComment).get(getBracketComments);
router
  .route("/:bracketId/comments/:commentId")
  .delete(deleteBracketComment)
  .patch(updateBracketComment);

export default router;
