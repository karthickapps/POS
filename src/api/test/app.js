const DbEngine = require("./helpers/dbEngine");

async function main() {
 try {
   const product = { id: "crayons", product_type: "writing", title: "crayons", user_id: 1 };
   const engine = new DbEngine();
   engine.setTable("products");

   await engine.insert(product);

   const allProducts = await engine.getAll();

   const rowsAffected = await engine.deleteAll();

   console.log("allProducts => \n", allProducts);
   console.log("rowsAffected (deleteAll) => \n", rowsAffected);

 } catch (err) {
   console.log("Error (app.js) :\n", err);
 }
}

main();