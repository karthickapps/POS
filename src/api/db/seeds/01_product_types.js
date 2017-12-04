exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("product_types")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("product_types").insert([
        { type: "writing", user_id: 1 },
        { type: "printing", user_id: 2 },
        { type: "misc", user_id: 2 }
      ]);
    });
};
