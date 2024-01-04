import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await pool.query("INSERT INTO usr DEFAULT VALUES RETURNING *", []);

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

      const result = await pool.query("SELECT * FROM usr WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query("DELETE FROM usr WHERE id = $1", [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json({ msg: `Deleting user ${id}` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

export default router;
