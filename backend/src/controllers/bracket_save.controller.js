import pool from "../db.js";

const createBracketSave = async (req, res) => {
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
};

const getBracketSaves = async (req, res) => {
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
};

const deleteBracketSave = async (req, res) => {
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
};

export { createBracketSave, getBracketSaves, deleteBracketSave };
