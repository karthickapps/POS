const tableNames = require("../../../db/tableNames");

const routesConfig = [
  { route: "products", table: tableNames.products },
  { route: "productTypes", table: tableNames.productTypes },
  { route: "expenseTypes", table: tableNames.expenseTypes },
  { route: "expense", table: tableNames.expense },
  { route: "customers", table: tableNames.customers }
];

module.exports = routesConfig;
