module.exports = (table, knex) => {
  table.string("id", 75).primary();
  table.string("description").notNullable();
  table.decimal("price").notNullable();
  table
    .string("product_type")
    .references("type")
    .inTable("product_types");
  table.string("created_at").defaultTo(knex.fn.now());
  table.string("updated_at").defaultTo(knex.fn.now());
  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo(1);
};
