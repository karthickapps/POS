module.exports = (table, knex) => {
  table.string("id").primary();
  table.string("password").notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
};
