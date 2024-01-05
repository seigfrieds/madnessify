import pool from "../db.js";

const createBracket = async (req, res) => {
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
};

const getBracket = async (req, res) => {
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
};

const deleteBracket = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM bracket WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Bracket not found!" });
    }

    res.status(200).json({ message: `Deleting bracket ${id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBracket = async (req, res) => {
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
};

export { createBracket, getBracket, deleteBracket, updateBracket };
