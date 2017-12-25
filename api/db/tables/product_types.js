module.exports = (table, knex) => {
  table.string("type").primary();
  table.string("created_at").defaultTo(knex.fn.now());
  table.string("updated_at").defaultTo(knex.fn.now());
  table
    .integer("user_id")
    .references("id")
    .inTable("users");
};
