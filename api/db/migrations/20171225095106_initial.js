/* eslint-disable */
const tables = require("../tables");

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => tables.users(table, knex))
    .createTable("product_types", table => tables.productTypes(table, knex))
    .createTable("products", table => tables.products(table, knex))
    .createTable("measure", table => tables.measure(table, knex));
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("users")
    .dropTable("product_types")
    .dropTable("products")
    .dropTable("measure");
};
