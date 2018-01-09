const knex = require("../../db/knex");

const {
  getJsonResponse,
  getJsonErrorResponse
} = require("../helpers/response_object");

// TODO: Log all the errors for debugging.
class Crud {
  constructor(tableName, routeName) {
    this.tableName = tableName;
    this.routeName = routeName;
    this.selectAll = this.selectAll.bind(this);
    this.getItem = this.getItem.bind(this);
    this.delete = this.delete.bind(this);
    this.selectById = this.selectById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async getItem(req, res) {
    try {
      const rows = await knex(this.tableName).where(
        "id",
        "like",
        `${req.params.query}%`
      );
      res.send(getJsonResponse(rows));
    } catch (err) {
      console.log(err);
      res.send(getJsonErrorResponse("HE01"));
    }
  }

  async selectAll(req, res) {
    try {
      const rows = await knex.select().from(this.tableName);
      res.send(getJsonResponse(rows));
    } catch (err) {
      res.send(getJsonErrorResponse("HE01"));
    }
  }

  async delete(req, res) {
    try {
      const noOfRowsDeleted = await knex(this.tableName)
        .where("id", "=", req.params.id)
        .delete();
      res.send(getJsonResponse(noOfRowsDeleted));
    } catch (err) {
      res.send(getJsonErrorResponse("HE02"));
    }
  }

  async selectById(req, res) {
    try {
      const product = await knex
        .select()
        .from(this.tableName)
        .where({
          id: req.params.id
        });
      res.send(getJsonResponse(product));
    } catch (err) {
      res.send(getJsonErrorResponse("HE03"));
    }
  }

  async create(req, res) {
    const product = req.body;

    try {
      await knex(this.tableName).insert(product);

      const result = await knex(this.tableName).count("id as rows");

      const noOfRowsAvailable = result[0].rows;

      res.send(getJsonResponse(noOfRowsAvailable));
    } catch (err) {
      res.send(getJsonErrorResponse("HE04"));
    }
  }

  async update(req, res) {
    const product = req.body;

    try {
      const noOfRowsAffected = await knex(this.tableName)
        .where("id", "=", req.params.id)
        .update(product);
      res.send(getJsonResponse(noOfRowsAffected));
    } catch (err) {
      res.send(getJsonErrorResponse("HE05"));
    }
  }
}

module.exports = Crud;
