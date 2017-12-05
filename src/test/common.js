// http://blog.mgechev.com/2014/04/16/singleton-in-javascript/
const chai = require('chai');
const chaiHttp = require('chai-http');

const moq = require("./moq");
const helpers = require("./helpers");

const should = chai.should();
chai.use(chaiHttp);

const server = require('../app/server');

const common = (function () {
  
  // Instance stores a reference to the Singleton
  let instance;

  let token;

  const getToken = () => {
		return token;
	}

	const fetch = {
		get: async (route) => {
			return await chai.request(server)
	      .get(route)
	      .set("Authorization", getToken());
		},
		del: async (route) => {
			return await chai.request(server)
	      .del(route)
	      .set("Authorization", getToken());
		},
		post: async (route, jsonData, type = "form") => {
			return await chai.request(server)
			  .post(route)
			  .set("Authorization", getToken())
			  .type('form')
			  .send(jsonData);
		},
		put: async (route, jsonData, type = "form") => {
			return await chai.request(server)
			  .put(route)
			  .set("Authorization", getToken())
			  .type('form')
			  .send(jsonData);
		}
	}

  function init() {
    return {
     	moq,
			helpers,
			chai,
			server,
			getToken,
			setToken: (t) => {
				token = t;
			},
			fetch
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    instance: (function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    })()
  };
})();

module.exports = common;