const models = require("../models");

async function createOrder(req, res) {
  const cardData = { ...req.body.payment };
  const cardQuery = {
    where: {
      cardNumber: req.body.payment.cardNumber
    }
  }
  const buyerData = { ...req.body.user };
  const buyerQuery = {
    where: {
      email: req.body.user.email
    }
  }
  // Check if user.id exists
  const order = {
    buyerId: "",
    cardId: "",
    userId: "",
    productId: "",
    productOwnerId: "",
    quantity: "",
    price: ""
  }
  // Check if user is logged in and id exists
  if (req.body.userId != null) {
    order.userId = req.body.userId;
  }
  // Create and get cardId
  const card = await models.Cards.findOne(cardQuery);
  if (card == null) {
    const cardCreate = await models.Cards.create(cardData);
    order.cardId = cardCreate.id;
  }
  else {
    order.cardId = card.id;
  }
  // Create and get buyerId
  const buyer = await models.Buyers.findOne(buyerQuery);
  if (buyer == null) {
    const buyerCreate = await models.Buyers.create(buyerData);
    order.buyerId = buyerCreate.id;
  }
  else {
    order.buyerId = buyer.id;
  }
  // For each product from cart, make an order
  const response = [];
  req.body.products.forEach(product => {
    order.productId = product.id;
    order.productOwnerId = product.userId;
    order.quantity = product.selectedQuantity;
    order.price = product.price;

    models.Orders.create(order).then(() => response.push(res.status)).catch((err) => res.jsend.error(err));
  });
  res.jsend(response);
}

module.exports = { createOrder };