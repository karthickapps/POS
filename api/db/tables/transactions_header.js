module.exports = (table, knex) => {
  table
    .string("id", 35)
    .primary()
    .references("id")
    .inTable("transactions");

  table.decimal("bill_amount").notNullable();
  table.decimal("net_amount_paid").notNullable();
  table.string("sale_type", 10).notNullable();

  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());

  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo("admin");
};
