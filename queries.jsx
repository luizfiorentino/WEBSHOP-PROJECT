const { product, category } = require("./models");

async function categoryWithProducts(id) {
  const specificCategory = await category.findByPk(id, {
    include: { model: product, attributes: ["title"] },
  });
  return specificCategory.toJSON();
}
//categoryWithProducts(3).then((cat) => console.log(cat));

async function allCategoriesWithProducts(id) {
  const specificCategory = await category.findAll({
    include: { model: product, attributes: ["title"] },
  });
  return specificCategory.map((cat) => cat.toJSON());
}
//allCategoriesWithProducts().then((cat) => console.log(cat));
