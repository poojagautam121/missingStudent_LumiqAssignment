const db = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Sequelize = require("sequelize");
console.log("config", config);

let isAlter = true;
module.exports = {
  manageDatabase: function () {
    db.sequelize
      .sync({ alter: true }) //create all the defined tables in the specified database.
      .then((result) => {})
      .catch((e) => {
        console.log("===error in db ===", e);
      });
  },
};
