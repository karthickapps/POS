const { chai, server, getToken, fetch, moq } = require("../common").instance;

describe("Products route (/api/products)", function () {
	it('it should throw unauthorized exception', async function () {
	    let response;
	    try {
	    	response = await chai.request(server)
	      	.get('/api/products')
	    } catch (err) {
	    	err.response.should.have.status(401);
	    }	    
	  });

		it('it should GET all the products', async function () {
	    const response = await fetch.get('/api/products');

	    response.should.have.status(200);
	    chai.expect(response.body.payload).to.have.lengthOf(4);	    
	  });

	  it('it should CREATE a product', async function () {
	  	const response = await fetch.post('/api/products', moq.newProduct);

	    response.should.have.status(200);
	    chai.expect(response.body.payload).to.equal(5);
	  });

	  it('it should UPDATE a product', async function () {
	  	let response = await fetch.put(`/api/products/${moq.productToUpdate.id}`, moq.productToUpdate);

	    response.should.have.status(200);

	    // Fetch and verify whether the product has been deleted or not.
	    response = await fetch.get(`/api/products/${moq.productToUpdate.id}`);

	    chai.expect(response.body.payload).to.have.lengthOf(1);

	    const product = response.body.payload[0];

	    chai.expect(product.title).to.equal(moq.productToUpdate.title);
	  });

	  it('it should DELETE a product', async function () {
	  	let response = await fetch.del(`/api/products/${moq.newProduct.id}`);

	    response.should.have.status(200);

	    // Fetch and verify whether the product has been deleted or not.
	    response = await fetch.get("/api/products");

	    chai.expect(response.body.payload).to.have.lengthOf(4);	
	  });
});