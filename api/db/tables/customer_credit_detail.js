module.exports = (table, knex) => {
  table
    .string("id", 35)
    .primary()
    .references("id")
    .inTable("transactions");

  table
    .string("cust_id")
    .references("id")
    .inTable("customers");

  table.decimal("amount").notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());

  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo("admin");
};
