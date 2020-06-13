module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define("buyer", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    houseNumber: {
      type: DataTypes.STRING,
    },
    zipCode: {
      type: DataTypes.STRING,
    }
  });

  return Buyer;
};