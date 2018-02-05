module.exports = (table, knex) => {
  table.string("id", 35);

  table
    .string("product_id")
    .notNullable()
    .references("id")
    .inTable("products");

  table.primary(["id", "product_id"]);

  table.integer("qty").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());

  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo("admin");
};
