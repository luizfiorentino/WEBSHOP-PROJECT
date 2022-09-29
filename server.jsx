const express = require("express");
const PORT = 4000;
const app = express();
const cors = require("cors");
const productRouter = require("./routers/product.jsx");
const categoryRouter = require("./routers/category.jsx");
const commentRouter = require("./routers/comment.jsx");
const userRouter = require("./routers/user.jsx");
const authRouter = require("./routers/auth.jsx");

app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/comments", commentRouter);
app.use("/users", userRouter);
app.use("/login", authRouter);

app.get("/test", async (req, res) => {
  console.log("testing server ok");
  res.send("server check");
});
app.listen(PORT, () => {
  console.log("::", PORT);
});
