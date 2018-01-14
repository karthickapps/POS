/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          id: "pen",
          price: 10,
          product_type: "writing",
          title: "pen",
          user_id: 1
        },
        {
          id: "pencil",
          product_type: "writing",
          price: 5,
          title: "stationery",
          user_id: 1
        },
        {
          id: "A4",
          price: 200,
          product_type: "printing",
          title: "printing",
          user_id: 1
        },
        {
          id: "A3",
          price: 350,
          product_type: "printing",
          title: "printing",
          user_id: 2
        }
      ]);
    });
};
