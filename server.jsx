const express = require("express");
const PORT = 4000;
const app = express();
const cors = require("cors");
const productRouter = require("./routers/product.jsx");
const categoryRouter = require("./routers/category.jsx");

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.get("/test", async (req, res) => {
  console.log("testing server ok");
  res.send("server check");
});
app.listen(PORT, () => {
  console.log("::", PORT);
});
