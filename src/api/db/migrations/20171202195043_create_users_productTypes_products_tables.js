exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table) {
      // table.increments();
      table.string("id").primary();
      table.string("password").notNullable();
      table.string("created_at").defaultTo(knex.fn.now());
      table.string("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("product_types", function(table) {
      table.string("type").primary();
      table.string("created_at").defaultTo(knex.fn.now());
      table.string("updated_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .references("id")
        .inTable("users");
    })
    .createTable("products", function(table) {
      table.string("id").primary();
      table.string("title").notNullable();
      table
        .string("product_type")
        .references("type")
        .inTable("product_types");
      table.string("created_at").defaultTo(knex.fn.now());
      table.string("updated_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .references("id")
        .inTable("users");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("users")
    .dropTable("product_types")
    .dropTable("products");
};
