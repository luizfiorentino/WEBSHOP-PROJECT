const { Router } = require("express");
const authMiddleware = require("../auth/middleware.jsx");

const { toJWT } = require("../auth/jwt.jsx");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findAll();
    const response = user.data;
    console.log("backend::", user);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password required");
    } else {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).send("No user mathing this email");
      } else if (bcrypt.compareSync(password, user.password)) {
        const jwt = toJWT({ userId: user.id });
        res.send({
          jwt,
        });
      } else {
        res.status(400).send({ message: "Incorrect password" });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
