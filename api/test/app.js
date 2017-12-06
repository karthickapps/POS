
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { server, moq, helpers, setToken } = require("./common").instance;

// parent block
describe('Accounts book API testing.', function () {
	// Before each test we initialize with the dummy data the database
  beforeEach(async () => { 
  	
  	await helpers.dbEngine.resetData();
  	
  	const token = await helpers.auth.signin(moq.validUser);

  	setToken(token);
  });

  require("./routes-tests");

});