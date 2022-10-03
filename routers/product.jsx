const { Router } = require("express");
const router = new Router();
const Product = require("../models").product;
const Category = require("../models").category;

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: { model: Category },
    });
    //res.send({ count, rows });

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    console.log("from server: page and limit", page, limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //const resultProducts = model.slice(startIndex, endIndex);
    const results = {};

    if (endIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (endIndex < Product.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    const resultProducts = allProducts.slice(startIndex, endIndex);
    res.json(resultProducts);
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

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = paserInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //const resultProducts = model.slice(startIndex, endIndex);
    const results = {};

    results.next = {
      page: page + 1,
      limit: limit,
    };

    results.previous = {
      page: page - 1,
      limit: limit,
    };

    results.results = users.slice(startIndex, endIndex);
    res.json(results);

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
  };
}

module.exports = router;
