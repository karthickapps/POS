// const chai = require('chai');
// const chaiHttp = require('chai-http');

// chai.use(chaiHttp);

// chai.request('http://localhost:8000/api')
//   .post('/signup')
//   .type('form')
//   .send({
//     'id': 'shan1',
//     'password': 'shan1'
//   })
//   .end((err, res) => {
// 	console.log(res.text);
// });

// chai.request('http://localhost:8000/api/products')
//   .get('/')
//   .end((err, res) => {
// 	console.log(res.body.length);
// });

// .set("Authorization", )

// const Moq = require("./moq");
// const DbEngine = require("./helpers/dbEngine");

// const moq = new Moq();

// async function main() {
// 	try {
// 		const product = { id: "crayons", product_type: "writing", title: "crayons", user_id: 1 };
// 		const engine = new DbEngine("products");
// 		engine.tableName = "products";

// 		const returned = await engine.insert(product);

// 		const allProducts = await engine.getAll();

// 		console.log("returned", returned);
// 		console.log("allProducts", allProducts);

// 	} catch (err) {
// 		console.log("Error (app.js) :\n", err);
// 	}
// }

// main();

// const Service = (function () {
//   const Service = function () {
//     this.say = "Hello";
//   }
  
//   Service.prototype.publicMethod = function () {
//     console.log(this.say);
//   }

//   var privateMethod = function () {
//     console.log(this.say);
//   }

//   return Service;
// })();

// var obj = new Service();
// obj.say = "hey";

// obj.publicMethod();

// const engine = new DbEngine("products");
// engine.insert({});
