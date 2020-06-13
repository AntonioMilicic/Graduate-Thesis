module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("card", {
    cardType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardOwnerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Card;
};
