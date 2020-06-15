const models = require("../models");

async function createOrder(req, res) {
  const cardData = req.body.payment;
  const cardQuery = {
    where: {
      cardNumber: req.body.payment.cardNumber
    }
  }
  const buyerData = req.body.user;
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
  // Create and get cardId, cardnumber is always unique
  const card = await models.Cards.findOne(cardQuery);
  if (card == null) {
    models.Cards.create(cardData)
      .then(data => { order.cardId = data.id })
      .catch(err => res.jsend.error(err));

  }
  else {
    order.cardId = card.id;
  }
  // Create and get buyerId
  const buyer = await models.Buyers.findOne(buyerQuery);
  if (buyer == null) {
    models.Buyers.create(buyerData)
      .then(data => { order.buyerId = data.id })
      .catch(err => res.jsend.error(err));
  }
  else {
    order.buyerId = buyer.id;
  }
  // For each product from cart, make an order
  req.body.products.forEach(product => {
    order.productId = product.id;
    order.productOwnerId = product.userId;
    order.quantity = product.quantity;
    order.price = product.price;

    models.Orders.create(order)
      .catch((err) => res.jsend.error(err));
  });
  res.jsend.success("success");
}

module.exports = { createOrder };