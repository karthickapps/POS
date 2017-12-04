const knex = require("../../db/knex");

const DbEngine = (function () {

	const DbEngine = function () {}

	let _tableName = null;

	DbEngine.prototype.setTable = function (tableName) {
		_tableName = tableName;
	},

	DbEngine.prototype.insert = async function (row) {
		try {
			if (Array.isArray(row)) {
				throw new Exception("The input should be a JOSN doc. For bulk insert use insertMultiple()");
			}

			await knex(_tableName).insert(row);
		} catch (err) {
      console.log(`Error (DbEngine.insert) => ${_tableName} :\n`, err);
    }
	},

	DbEngine.prototype.insertMultiple = async function (rows) {
		try {
			if (!Array.isArray(row)) {
				throw new Exception("The input should be an array of JSON doc.");
			}

			await knex(_tableName).insert(rows);
		} catch (err) {
      console.log(`Error (DbEngine.insert) => ${_tableName} :\n`, err);
    }
	}

	DbEngine.prototype.getAll = async function () {
		try	{
	 			const rows = await knex.select().from(_tableName)
	 			return rows;
	 		} catch (err) {
	 			console.log(`Error (DbEngine.getAll) => ${_tableName} :\n`, err);
	 		}
	}

	DbEngine.prototype.query = async function (query) {
 		try {
 			const row = await knex
	      .select()
	      .from(_tableName)
	      .where(query);

	     return row;
 		} catch (err) {
 			console.log(`Error (DbEngine.query) => ${_tableName} :\n`, err);
 		}
 	}

 	DbEngine.prototype.deleteAll = async function () {
 		try {
 			const noOfRowsAffected = await knex(_tableName).delete();
 			return noOfRowsAffected;
 		} catch (err) {
 			console.log(`Error (DbEngine.delete) => ${_tableName} :\n`, err);
 		}
 	}

	return DbEngine;
})();

module.exports = DbEngine;