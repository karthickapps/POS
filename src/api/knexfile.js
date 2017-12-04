// https://github.com/sheerun/knex-migrate

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/db/data/mydb.sqlite"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    },
    useNullAsDefault: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/db/data/mydb.sqlite"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/production"
    },
    useNullAsDefault: true
  }
};
