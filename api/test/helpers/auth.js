const chai = require('chai');
const chaiHttp = require('chai-http');

const { apiUrl, tokenUrl } = require("../configuration");

chai.use(chaiHttp);

module.exports = {
	signin: async (user) => {
		try {
			const res = await chai
			  .request(tokenUrl)
			  .post("/")
			  .type("form")
			  .send(user);

			return res.body.token || null;
		} catch (err) {
			console.log("Error (helper.signin)\n", err);
		}
	},

	signup: async (user) => {
		try {
			const res = await chai
			  .request(apiUrl)
			  .post("/signup")
			  .type("form")
			  .send(user);

			console.log(res);
		} catch (err) {
			console.log("Error (helper.signup\n", err);
		}
	}
}