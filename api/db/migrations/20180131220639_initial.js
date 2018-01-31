/* eslint-disable */
const tables = require("../tables");

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => tables.users(table, knex))
    .createTable("product_types", table => tables.productTypes(table, knex))
    .createTable("products", table => tables.products(table, knex))
    .createTable("expense", table => tables.expense(table, knex))
    .createTable("customers", table => tables.customers(table, knex))
    .createTable("expense_types", table => tables.expenseTypes(table, knex))
    .createTable("transactions", table => tables.transactions(table, knex))
    .createTable("transactions_header", table =>
      tables.transactionsHeader(table, knex)
    );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("users")
    .dropTable("product_types")
    .dropTable("products")
    .dropTable("expense")
    .dropTable("customers")
    .dropTable("expense_types")
    .dropTable("transactions")
    .dropTable("transactions_header");
};
