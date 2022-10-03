const { Router } = require("express");
const router = new Router();
const Order = require("../models").order;

router.get("/", async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({ raw: true });
    res.send(allOrders);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, totalToPay, orderNumber, whetherPaid } = req.body;
    const newOrder = await Order.create({
      userId: parseInt(userId),
      totalToPay: parseInt(totalToPay),
      orderNumber: parseInt(orderNumber),
      whetherPaid: false, //hardcoded for now
    });
    if (!totalToPay || !userId || !orderNumber) {
      res
        .status(400)
        .send("totalToPay, userId, and orderNumber must be informed");
    } else {
      res.send(newOrder);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
