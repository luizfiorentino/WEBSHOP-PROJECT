const { Router } = require("express");
const router = new Router();
//const Product = require("../models").product;
const Category = require("../models").category;

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
