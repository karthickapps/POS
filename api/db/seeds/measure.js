/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("measure")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("measure").insert([
        { id: "no", title: "qty in number", user_id: 1 },
        { id: "box", title: "qty in box", user_id: 1 }
      ]);
    });
};
