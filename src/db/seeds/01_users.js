/* eslint-disable */

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: "sfkshan", password: "shan" },
        { id: "raj123", password: "str0ng" },
        { id: "shan", password: "breakit" },
      ]);
    });
};
