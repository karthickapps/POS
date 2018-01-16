// expense table schema
module.exports = (table, knex) => {
  table.increments();
  table
    .string("expense_type")
    .references("id")
    .inTable("expense_types");

  table.string("description").notNullable();
  table.decimal("amount").notNullable();
  table
    .timestamp("date")
    .notNullable()
    .defaultTo(knex.fn.now());
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
  table
    .integer("user_id")
    .references("id")
    .inTable("users")
    .defaultTo("admin");
};
