const knex = require("../../db/knex");

// https://medium.com/@davidrhyswhite/private-members-in-es6-db1ccd6128a5

const Exception = message => {
  this.message = message;
};

// eslint-disable-next-line
const DbEngine = (function() {
  // eslint-disable-next-line
  const DbEngine = function() {};

  // eslint-disable-next-line
  let _tableName = null;

  // eslint-disable-next-line
  DbEngine.prototype.resetData = async function() {
    try {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();

      console.log("Data got restored to initial values.");
    } catch (err) {
      console.log("Eror (resetData) :\n", err);
    }
  };

  // eslint-disable-next-line
  DbEngine.prototype.setTable = function(tableName) {
    _tableName = tableName;
  };

  // eslint-disable-next-line
  DbEngine.prototype.insert = async function(row) {
    try {
      if (Array.isArray(row)) {
        throw new Exception(
          "The input should be a JOSN doc. For bulk insert use insertMultiple()",
        );
      }

      await knex(_tableName).insert(row);
    } catch (err) {
      console.log(`Error (DbEngine.insert) => ${_tableName} :\n`, err);
    }
  };

  // eslint-disable-next-line
  DbEngine.prototype.insertMultiple = async function(rows) {
    try {
      if (!Array.isArray(rows)) {
        throw new Exception("The input should be an array of JSON doc.");
      }

      await knex(_tableName).insert(rows);
    } catch (err) {
      console.log(`Error (DbEngine.insert) => ${_tableName} :\n`, err);
    }
  };

  // eslint-disable-next-line
  DbEngine.prototype.getAll = async function() {
    try {
      const rows = await knex.select().from(_tableName);
      return rows;
    } catch (err) {
      console.log(`Error (DbEngine.getAll) => ${_tableName} :\n`, err);
    }
  };

  // eslint-disable-next-line
  DbEngine.prototype.query = async function(query) {
    try {
      const row = await knex
        .select()
        .from(_tableName)
        .where(query);

      return row;
    } catch (err) {
      console.log(`Error (DbEngine.query) => ${_tableName} :\n`, err);
    }
  };

  // eslint-disable-next-line
  DbEngine.prototype.deleteAll = async function() {
    try {
      const noOfRowsAffected = await knex(_tableName).delete();
      return noOfRowsAffected;
    } catch (err) {
      console.log(`Error (DbEngine.delete) => ${_tableName} :\n`, err);
    }
  };

  return DbEngine;
})();

module.exports = DbEngine;
