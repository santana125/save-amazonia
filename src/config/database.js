const Sequelize = require('sequelize');


module.exports = new Sequelize({
    username: "zhfelgmy",
    password: "83CX2eKkSG2W2HaN3HFsI-LFbwW2MOyJ",
    database: "zhfelgmy",
    dialect: "postgres",
    host: "motty.db.elephantsql.com",
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true,
      timezone: "-03:00"
    },
    timezone: "-03:00"
});
