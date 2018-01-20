/* eslint-disable */
const names = require("../dumps/names");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("customers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("customers").insert(getBulkCustomers());
    });
};

const getBulkCustomers = () => {
  const customers = [];

  customers.push({
    id: 1234567890,
    name: "shan",
    description: "Test customer 1",
    address: "PS Complex"
  });

  for (let idx = 0; idx < 166; idx++) {
    const id = 9678600000 + idx;
    const name = names[idx];

    const customer = {
      id,
      name,
      description: "test customer",
      address: "adress 12"
    };
    customers.push(customer);
  }
  return customers;
};
