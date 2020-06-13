module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productOwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Order;
};
