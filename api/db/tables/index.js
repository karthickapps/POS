const users = require("./users");
const customers = require("./customers");
const products = require("./products");
const productTypes = require("./product_types");
const expense = require("./expense");
const expenseTypes = require("./expense_types");
const transactions = require("./transactions");
const transactionsHeader = require("./transactions_header");

module.exports = {
  users,
  products,
  productTypes,
  expense,
  expenseTypes,
  customers,
  transactions,
  transactionsHeader
};
