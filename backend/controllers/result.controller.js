import pool from "../db.js";

const createResult = async (req, res) => {
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
};

const getResult = async (req, res) => {
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
};

const deleteResult = async (req, res) => {
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
};

const updateResult = async (req, res) => {
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
};

export { createResult, getResult, deleteResult, updateResult };
