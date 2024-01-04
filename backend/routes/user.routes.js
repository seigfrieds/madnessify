import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "Creating a user" });
});

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Getting user ${id}` });
  })
  .delete((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Deleting user ${id}` });
  })
  .patch((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Updating user ${id}` });
  });

export default router;
