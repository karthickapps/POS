/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("expense_types")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("expense_types").insert([
        { id: "bill" },
        { id: "purchase" },
        { id: "misc" }
      ]);
    });
};
