const { Router } = require("express");
const router = new Router();
const Product = require("../models").product;
const Category = require("../models").category;

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category },
    });
    res.send(allProducts);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const specificProduct = await Product.findByPk(productId, {
      include: { model: Category },
    });
    if (!specificProduct) {
      res.status(404).send({ message: "product with provided id not found" });
    } else {
      res.send(specificProduct);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
