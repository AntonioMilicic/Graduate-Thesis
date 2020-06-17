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
  if (req.body.userId) {
    order.userId = req.body.userId;
  } // Delete userId from order, so that data type doesnt missmatch
  else { delete order.userId }
  // Create and get cardId, cardnumber is always unique
  const card = await models.Cards.findOne(cardQuery);
  if (!card) {
    const createdCard = await models.Cards.create(cardData);
    order.cardId = createdCard.id;
  }
  else {
    order.cardId = card.id;
  }
  // Create and get buyerId
  const buyer = await models.Buyers.findOne(buyerQuery);
  if (!buyer) {
    const createdBuyer = await models.Buyers.create(buyerData)
    order.buyerId = createdBuyer.id;
  }
  else {
    order.buyerId = buyer.id;
  }
  // For each product from cart, make an order
  req.body.products.forEach(async product => {
    order.productId = product.id;
    order.productOwnerId = product.userId;
    order.quantity = product.quantity;
    order.price = product.price;

    await models.Orders.create(order);
    // reduce quantity on product
    models.Products.findByPk(product.id)
      .then((data) => {
        if (data) {
          data.quantity -= product.quantity;
          data.save();
        }
      })
  });
  res.jsend.success("success");
}

module.exports = { createOrder };