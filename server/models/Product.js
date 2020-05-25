module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    imageSources: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });

  return Product;
};
