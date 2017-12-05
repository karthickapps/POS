// https://github.com/sheerun/knex-migrate

const devAndTest = {
  client: "sqlite3",
  connection: {
    filename: `${__dirname}/db/data/mydb.sqlite`,
  },
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
  useNullAsDefault: true,
};

module.exports = {
  development: devAndTest,

  test: devAndTest,

  production: {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/db/data/mydb.sqlite`,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds/production`,
    },
    useNullAsDefault: true,
  },
};
