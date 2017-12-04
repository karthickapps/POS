const chai = require("chai");
const chaiHttp = require("chai-http");

const { API_URL } = require("../configuration");

// https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
chai.use(chaiHttp);

chai
  .request(API_URL)
  .post("/signup")
  .type("form")
  .send({
    id: "shan1",
    password: "shan1",
  })
  .end((err, res) => {
    console.log(res.text);
  });

chai
  .request(API_URL)
  .get("/products")
  .end((err, res) => {
    console.log(res.body.length);
  });

// .set("Authorization", )
