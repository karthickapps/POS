const chai = require('chai');
const chaiHttp = require('chai-http');

const { apiUrl, tokenUrl } = require("../configuration");

chai.use(chaiHttp);

module.exports = {
	signin: async (user) => {
		const res = await chai
			  .request(tokenUrl)
			  .post("/")
			  .type("form")
			  .send(user);

			return res.body.payload.token;
	},

	signup: async (user) => {
		const res = await chai
			  .request(apiUrl)
			  .post("/signup")
			  .type("form")
			  .send(user);
			
		return res.body.payload.token;
	}
}