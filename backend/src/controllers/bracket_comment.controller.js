import pool from "../db.js";

const createBracketComment = async (req, res) => {
  try {
    const { bracketId } = req.params;
    const { parentId, userId, comment } = req.body;

    const result = await pool.query(
      "INSERT INTO bracket_comment (parent_id, user_id, bracket_id, is_deleted, comment, commented_at) " +
        "VALUES($1, $2, $3, false, $4, now()) RETURNING *",
      [parentId, userId, bracketId, comment]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBracketComments = async (req, res) => {
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
};

const deleteBracketComment = async (req, res) => {
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
};

const updateBracketComment = async (req, res) => {
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
};

export { createBracketComment, getBracketComments, deleteBracketComment, updateBracketComment };
