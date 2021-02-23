const db = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Sequelize = require("sequelize");
console.log("config", config);

let isAlter = true;
module.exports = {
  manageDatabase: function () {
    // tableList.forEach((t) => {
    //   console.log("table name =", t);
    //   db[t]
    //     .sync({ [config.db.models]: true })
    db.sequelize
      .sync({ alter: true }) //create all the defined tables in the specified database.
      .then((result) => {
        console.log("====Databses updated====");
      })
      .catch((e) => {
        console.log("===error in db ===", e);
      });
    // });
  },
};
