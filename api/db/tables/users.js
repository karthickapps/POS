module.exports = (table, knex) => {
  table.string("id").primary();
  table.string("password").notNullable();
  table.string("created_at").defaultTo(knex.fn.now());
  table.string("updated_at").defaultTo(knex.fn.now());
};
