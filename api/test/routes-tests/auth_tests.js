/* eslint-disable */
const { chai, server, getToken, fetch, moq } = require("../common").instance;

describe("Auth route (/api/signin)", function() {
  it("it should signin successfully", async function() {
    const response = await fetch.post("/api/signin", moq.validUser);

    response.should.have.status(200);
    chai.expect(response.body.payload).to.have.property("token");
    chai.expect(response.body.payload.token).to.not.be.empty;
  });

  it(
    "it should not sigin with invalid credentials and return status failed", 
    async function() {
      const response = await fetch.post("/api/signin", moq.inValidUser);

      response.should.have.status(200);
      chai.expect(response.body.payload).to.not.have.property("token");
      chai.expect(response.body.status).to.be.equal(moq.FAILED);
      chai.expect(response.body.errorCode).to.be.equal(moq.inValidSiginInCode);
    }
  );

  it(
    "it should not sigin without password and return http status 400", 
    async function() {
      const t = {};
      t.id = "dummy";
      t.password = "";

      try {
        const response = await fetch.post("/api/signin", t);
      } catch (err) {
        err.response.should.have.status(400);
      }      
    }
  );
});

describe("Auth route (/api/signup)", function() {
  it("it should signup successfully", async function() {
    const response = await fetch.post("/api/signup", moq.newUser);

    response.should.have.status(200);
    chai.expect(response.body.payload).to.have.property("token");
    chai.expect(response.body.payload.token).to.not.be.empty;
  });

  it(
    "it should not sigup with existing user and should fail", 
    async function() {
      const response = await fetch.post("/api/signup", moq.validUser);

      response.should.have.status(200);
      chai.expect(response.body.payload).to.not.have.property("token");
      chai.expect(response.body.status).to.be.equal(moq.FAILED);
      chai.expect(response.body.errorCode).to.be.equal(moq.inValidSiginUpCode);
    }
  );

  it(
    "it should not sigin without password and return http status 400", 
    async function() {
      const t = {};
      t.id = "dummy";
      t.password = "";

      try {
        const response = await fetch.post("/api/signup", t);
      } catch (err) {
        err.response.should.have.status(400);
      }      
    }
  );
});