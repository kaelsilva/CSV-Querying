require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: process.env.DB_STORAGE_PATH,
  },
  production: {
    dialect: "sqlite",
    storage: process.env.DB_STORAGE_PATH,
  },
};
