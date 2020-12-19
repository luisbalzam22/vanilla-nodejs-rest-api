//AS THE NAME SUGGESTS: IT CONTROLS THE STATE OF THE APPLICATION BY CONTROLLING "WHAT" MODEL FUNCTIONS/METHODS ARE CALLED (UNDER CERTAIN CONDITIONS THAT DETERMINE SUCH DECISIONS), "WHAT" VALUES ARE PASSED ONTO SUCH FUNCIONS AND THE LOGIC BEHIND THE --FLOW-- OF THE DATA THROUGHOUT THE MAIN APPLICATION (IN THIS CASE, nodeserver.js)
//NOTE: FOR THIS CASE, FAILURES IN QUERYING OR SELECTING THE APPROPIATE DATABASE ELEMENTS ARE HANDLED HERE, NOT IN THE MODEL MODULE

const { Model } = require('../model/model.js');

//@desc Gets all products
//@route GET api/products
const getProducts = async function (request, response) {
	try {
		let data = await Model.findAll();
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(data));
	} catch (err) {
		console.log(err);
	}
};

//@desc Gets a single product
//@route GET api/products
const getProduct = async function (request, response, id) {
	try {
		let data = await Model.findOne(id);

		if (!data) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			response.end(
				JSON.stringify({ message: `Given product with ID ${id} doesn't exist` })
			);
			return;
		}
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(data));
	} catch (err) {
		console.log(err);
	}
};

//@desc Creates a single product
//@route POST api/products
const createProduct = async function (request, response) {
	try {
		let data = '';
		request.on('data', (chunk) => {
			data += chunk;
		});

		console.log(data);
		request.on('end', async () => {
			let { name, description, price } = JSON.parse(data);

			const newProduct = {
				name,
				description,
				price,
			};

			data = (await Model.createOne(newProduct)) || {
				message:
					'Sorry, unexpected error prevented your product to be added to the database',
			};
			response.writeHead(201, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify(data));
		});
	} catch (err) {
		console.log(err);
	}
};

//@desc Updates a single product
//@route PUT api/products
const updateProduct = async function (request, response, id) {
	try {
		let data = '';
		request.on('data', (chunk) => {
			data += chunk;
		});

		request.on('end', async () => {
			let item = await Model.updateOne(id, JSON.parse(data));
			if (!item) {
				response.writeHead(404, { 'Content-Type': 'application/json' });
				response.end(
					JSON.stringify({
						message: `Given product with ID ${id} doesn't exist`,
					})
				);
				return;
			}
			response.writeHead(200, { 'Content-Type': 'application/json' });

			response.end(JSON.stringify(item));
		});
	} catch (err) {
		console.log(err);
	}
};

//@desc Deletes a single product
//@route DELETE api/products
const deleteProduct = async function (request, response, id) {
	try {
		let deletedItem = await Model.deleteOne(id);

		if (!deletedItem) {
			response.writeHead(404, { 'Content-Type': 'application/json' });
			response.end(
				JSON.stringify({ message: `Given product with ID ${id} doesn't exist` })
			);
			return;
		}
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(deletedItem));
	} catch (err) {
		console.log(err);
	}
};

module.exports.Controller = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
