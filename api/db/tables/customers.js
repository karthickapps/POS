module.exports = (table, knex) => {
  table.integer("id", 10).primary();
  table.string("name", 100).notNullable();
  table.string("description");
  table.string("address");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo("admin");
};
