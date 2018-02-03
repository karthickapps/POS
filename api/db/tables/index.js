const users = require("./users");
const customers = require("./customers");
const products = require("./products");
const productTypes = require("./product_types");
const expense = require("./expense");
const expenseTypes = require("./expense_types");
const transactions = require("./transactions");
const transactionsHeader = require("./transactions_header");
const customerCreditDetail = require("./customer_credit_detail");
const customerCreditHeader = require("./customer_credit_header");
const customerDebitDetail = require("./customer_debit_detail");

module.exports = {
  users,
  products,
  productTypes,
  expense,
  expenseTypes,
  customers,
  transactions,
  transactionsHeader,
  customerCreditDetail,
  customerCreditHeader,
  customerDebitDetail
};
