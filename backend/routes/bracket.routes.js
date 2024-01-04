import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, bracket, title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO bracket (user_id, bracket, title, description, created_at) " +
        "VALUES($1, $2, $3, $4, now()) RETURNING *",
      [userId, JSON.stringify(bracket), title, description]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query("SELECT * FROM bracket WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Bracket not found!" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query("DELETE FROM bracket WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Bracket not found!" });
      }

      res.status(200).json({ message: `Deleting result ${id}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const result = await pool.query(
        "UPDATE bracket SET title = $1, description = $2 WHERE id = $3 RETURNING *",
        [title, description, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Bracket not found!" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router
  .route("/:bracketId/likes")
  .post(async (req, res) => {
    try {
      const { bracketId } = req.params;
      const { userId } = req.body;

      const result = await pool.query(
        "INSERT INTO bracket_like (user_id, bracket_id, liked_at) " +
          "VALUES($1, $2, now()) RETURNING *",
        [userId, bracketId]
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const { bracketId } = req.params;

      //note: returns [] for non existent brackets
      const result = await pool.query("SELECT * FROM bracket_like WHERE bracket_id = $1", [
        bracketId,
      ]);

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router.delete("/:bracketId/likes/:userId", async (req, res) => {
  try {
    const { bracketId, userId } = req.params;

    const result = await pool.query(
      "DELETE FROM bracket_like WHERE bracket_id = $1 AND user_id = $2",
      [bracketId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "That like did not exist" });
    }

    res.status(200).json({ msg: `Deleting like from user ${userId} on bracket ${bracketId}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router
  .route("/:bracketId/saves")
  .post(async (req, res) => {
    try {
      const { bracketId } = req.params;
      const { userId } = req.body;

      const result = await pool.query(
        "INSERT INTO bracket_save (user_id, bracket_id, saved_at) " +
          "VALUES($1, $2, now()) RETURNING *",
        [userId, bracketId]
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const { bracketId } = req.params;

      //note: returns [] for non existent brackets
      const result = await pool.query("SELECT * FROM bracket_save WHERE bracket_id = $1", [
        bracketId,
      ]);

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router.delete("/:bracketId/saves/:userId", async (req, res) => {
  try {
    const { bracketId, userId } = req.params;

    const result = await pool.query(
      "DELETE FROM bracket_save WHERE bracket_id = $1 AND user_id = $2",
      [bracketId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "That save did not exist" });
    }

    res.status(200).json({ msg: `Deleting save from user ${userId} on bracket ${bracketId}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router
  .route("/:bracketId/comments")
  .post(async (req, res) => {
    try {
      const { bracketId } = req.params;
      const { parentId, userId, comment } = req.body;

      const result = await pool.query(
        "INSERT INTO bracket_comment (parent_id, user_id, bracket_id, comment, commented_at) " +
          "VALUES($1, $2, $3, $4, now()) RETURNING *",
        [parentId, userId, bracketId, comment]
      );

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const { bracketId } = req.params;

      //note: returns [] for non existent brackets
      const result = await pool.query("SELECT * FROM bracket_comment WHERE bracket_id = $1", [
        bracketId,
      ]);

      res.status(200).json(result.rows);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

router
  .route("/:bracketId/comments/:commentId")
  .delete(async (req, res) => {
    try {
      const { bracketId, commentId } = req.params;

      const result = await pool.query("DELETE FROM bracket_comment WHERE id = $1", [commentId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ msg: "That comment did not exist" });
      }

      res.status(200).json({ msg: `Deleting comment ${commentId} on bracket ${bracketId}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;

      const result = await pool.query(
        "UPDATE bracket_comment SET comment = $1 WHERE id = $2 RETURNING *",
        [comment, commentId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

export default router;
