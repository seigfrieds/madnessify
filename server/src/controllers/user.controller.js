import pool from "../db.js";

const createUser = async (req, res) => {
  try {
    const { userId, displayName, imageUrl } = req.body;

    const result = await pool.query(
      "INSERT INTO usr (id, display_name, image_url) VALUES ($1, $2, $3) RETURNING *",
      [userId, displayName, imageUrl]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
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
};

export { createUser, getUser, deleteUser };
