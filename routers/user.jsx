const { Router } = require("express");
const router = new Router();
const User = require("../models").user;

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

// add new entry to user's table
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    if (!name || !email || !password) {
      res.status(400).send("Name, email, and password must be provided");
    } else {
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
