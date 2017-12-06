/* eslint-disable */
const { chai, server, getToken, fetch, moq } = require("../common").instance;

describe("ProductTypes route (/productTypes)", function() {
  it("it should throw unauthorized exception", async function() {
    let response;
    try {
      response = await chai.request(server).get("/api/productTypes");
    } catch (err) {
      err.response.should.have.status(401);
    }
  });

  it("it should GET all the productTypes", async function() {
    const response = await fetch.get("/api/productTypes");

    response.should.have.status(200);
    chai.expect(response.body.payload).to.have.lengthOf(3);
  });
});
