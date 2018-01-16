/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("expense")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("expense").insert([
        {
          amount: 1020,
          expense_type: "bill",
          description: "current bill"
        },
        {
          amount: 5435,
          expense_type: "bill",
          description: "purchase materials"
        }
      ]);
    });
};
