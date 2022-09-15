const { Router } = require("express");
const router = new Router();
const Product = require("../models").product;

router.get("/", async (req, res, next) => {
  const allProducts = await Product.findAll();
  res.send(allProducts);
});

module.exports = router;
