import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({ msg: "Creating a result" });
});

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Getting result ${id}` });
  })
  .delete((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Deleting result ${id}` });
  })
  .patch((req, res) => {
    const { id } = req.params;
    res.json({ msg: `Updating result ${id}` });
  });

export default router;
