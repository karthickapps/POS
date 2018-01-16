/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("product_types")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("product_types").insert([
        { id: "writing" },
        { id: "printing" },
        { id: "misc" }
      ]);
    });
};
