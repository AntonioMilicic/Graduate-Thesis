module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "toni1995",
  DB: "postgres",
  dialect: "postgres",
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
