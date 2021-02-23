const config = {
  development: {
    port: "1300",
    db: {
      username: "SA",
      password: "jftdefault@123",
      database: "ang_node_db",
      host: "127.0.0.1",
      dialect: "mssql",
      operatorsAliases: false,
      models: "alter",
      logging: false,
    },
  },
  test: {
    port: "1300",
    db: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mssql",
      operatorsAliases: false,
    },
  },
  production: {
    port: "1300",
    db: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mssql",
      operatorsAliases: false,
    },
  },
};

const NODE_ENV = process.env.NODE_ENV || "development";
const environment = config[NODE_ENV];
config.port = environment.port;
config.db_config = environment.db;
config.NODE_ENV = NODE_ENV;
module.exports = config;
