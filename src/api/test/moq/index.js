const knex = require("../../db/knex");
const data = require("./data");

// https://medium.com/@davidrhyswhite/private-members-in-es6-db1ccd6128a5

const Moq = (function () {

	const Moq = function () {
		this.data.resetData();
	}

	Moq.prototype.data = data;

	return Moq;
})();

module.exports = Moq;