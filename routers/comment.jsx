const { Router } = require("express");
const router = new Router();
const Comment = require("../models").comment;

router.get("/", async (req, res, next) => {
  try {
    const allComments = await Comment.findAll();
    res.send(allComments);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { productId, userId, comment } = req.body;
    const newComment = await Comment.create({ productId, userId, comment });
    if (!productId || !userId || !comment) {
      res.status(400).send("comment, productId and userId must be provided");
    } else {
      res.send(newComment);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
