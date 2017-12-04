const knex = require("../../db/knex");

module.exports = {
	resetData: async () => {
		try	{
			await knex.migrate.rollback();
			await knex.migrate.latest();
			await knex.seed.run();

			console.log("Data got restored to initial values.")
		} catch (err) {
			console.log("Eror (resetData) :\n", err);
		}
	}
}