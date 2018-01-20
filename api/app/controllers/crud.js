const knex = require("../../db/knex");

const {
  getJsonResponse,
  getJsonErrorResponse
} = require("../helpers/response_object");

const BATCH_SIZE = 50;

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
    this.getPage = this.getPage.bind(this);
  }

  async getItem(req, res) {
    try {
      const pageNo = req.params.pageNo;

      if (!pageNo) {
        const rows = await knex(this.tableName).where(
          "id",
          "like",
          `%${req.params.query}%`
        );
        res.send(getJsonResponse(rows));
      } else {
        const noToSkip = (pageNo - 1) * BATCH_SIZE;
        const rows = await knex(this.tableName)
          .where("id", "like", `%${req.params.query}%`)
          .limit(BATCH_SIZE)
          .offset(noToSkip);
        res.send(getJsonResponse(rows));
      }
    } catch (err) {
      res.send(getJsonErrorResponse("HE01"));
    }
  }

  async getPage(req, res) {
    try {
      const pageNo = req.params.no;
      const noToSkip = (pageNo - 1) * BATCH_SIZE;

      const rows = await knex
        .select()
        .from(this.tableName)
        .limit(BATCH_SIZE)
        .offset(noToSkip);
      res.send(getJsonResponse(rows));
    } catch (err) {
      res.send(getJsonErrorResponse("HE02", err.message));
    }
  }

  async selectAll(req, res) {
    try {
      const rows = await knex.select().from(this.tableName);
      res.send(getJsonResponse(rows));
    } catch (err) {
      res.send(getJsonErrorResponse("HE03"));
    }
  }

  async delete(req, res) {
    try {
      const noOfRowsDeleted = await knex(this.tableName)
        .where("id", "=", req.params.id)
        .delete();
      res.send(getJsonResponse(noOfRowsDeleted));
    } catch (err) {
      res.send(getJsonErrorResponse("HE04"));
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
      res.send(getJsonErrorResponse("HE05"));
    }
  }

  async create(req, res) {
    const item = req.body;

    try {
      await knex(this.tableName).insert(item);

      const result = await knex(this.tableName).count("id as rows");

      const noOfRowsAvailable = result[0].rows;

      res.send(getJsonResponse(noOfRowsAvailable));
    } catch (err) {
      let message = "";

      if (err.message.includes("UNIQUE constraint failed"))
        message = `This entered ${
          this.tableName
        } id exists already. Please try with some other unique id.`;
      else message = err.message;

      res.send(getJsonErrorResponse("HE06", message));
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
      res.send(getJsonErrorResponse("HE07"));
    }
  }
}

module.exports = Crud;
