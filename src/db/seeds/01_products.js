/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        { id: "pen", product_type: "writing", title: "pen", user_id: 1 },
        {
          id: "pencil",
          product_type: "writing",
          title: "stationery",
          user_id: 1,
        },
        { id: "A4", product_type: "printing", title: "printing", user_id: 1 },
        { id: "A3", product_type: "printing", title: "printing", user_id: 2 },
      ]);
    });
};
