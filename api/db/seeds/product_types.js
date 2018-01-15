/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("product_types")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("product_types").insert([
        { id: "writing", user_id: 1 },
        { id: "printing", user_id: 2 },
        { id: "misc", user_id: 2 }
      ]);
    });
};
