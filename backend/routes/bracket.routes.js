import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "Created a bracket" });
});

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Getting bracket ${id}` });
  })
  .delete((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Deleting bracket ${id}` });
  })
  .patch((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Updating bracket ${id}` });
  });

router
  .route("/:bracketid/likes")
  .post((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Creating a like on bracket ${bracketid}` });
  })
  .get((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Getting all likes on bracket ${bracketid}` });
  });

router.delete("/:bracketid/likes/:userid", (req, res) => {
  const { bracketid, userid } = req.params;
  res.json({ msg: `Deleting ${userid}'s like on bracket ${bracketid}` });
});

router
  .route("/:bracketid/saves")
  .post((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Creating a save on bracket ${bracketid}` });
  })
  .get((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Getting all saves on bracket ${bracketid}` });
  });

router.delete("/:bracketid/saves/:userid", (req, res) => {
  const { bracketid, userid } = req.params;
  res.json({ msg: `Deleting ${userid}'s save on bracket ${bracketid}` });
});

router
  .route("/:bracketid/comments")
  .post((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Creating a comment on bracket ${bracketid}` });
  })
  .get((req, res) => {
    const { bracketid } = req.params;
    res.json({ msg: `Getting all comments on bracket ${bracketid}` });
  });

router
  .route("/:bracketid/comments/:commentid")
  .delete((req, res) => {
    const { bracketid, commentid } = req.params;
    res.json({ msg: `Deleting comment ${commentid} on bracket ${bracketid}` });
  })
  .patch((req, res) => {
    const { bracketid, commentid } = req.params;
    res.json({ msg: `Updating comment ${commentid} on bracket ${bracketid}` });
  });

export default router;
