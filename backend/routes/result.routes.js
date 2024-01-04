import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, bracketId, bracket, title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO result (user_id, bracket_id, bracket, title, description, created_at) " +
        "VALUES($1, $2, $3, $4, $5, now()) RETURNING *",
      [userId, bracketId, JSON.stringify(bracket), title, description]
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

      const result = await pool.query("SELECT * FROM result WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Result not found!" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query("DELETE FROM result WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Result not found!" }); //exit early
      }

      res.status(200).json({ msg: `Deleting result ${id}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const result = await pool.query(
        "UPDATE result SET title = $1, description = $2 WHERE id = $3 RETURNING *",
        [title, description, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Result not found!" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

export default router;
