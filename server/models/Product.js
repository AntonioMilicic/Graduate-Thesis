module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageSources: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });

  return Product;
};
