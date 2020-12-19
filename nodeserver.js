const server = require('http').createServer();
const { Controller } = require('./controller/controller.js');
const PORT = process.env.PORT || 5000; //The "PORT" is a standard name that cloud enviroments give to the variable that holds the port number where servers'll be listening to requests

// "/apis/products/" is the entrypoint for this API

const api = function (request, response) {
	//GET REQUESTS (READ):
	if (/\/api\/products\/?$/.exec(request.url) && request.method === 'GET') {
		Controller.getProducts(request, response);
		console.log('GET');
		return;
	}
	if (
		/\/api\/products\/([\w-]+)/.exec(request.url) &&
		request.method === 'GET'
	) {
		let id = /\/api\/products\/([\w-]+)/.exec(request.url)[1];
		Controller.getProduct(request, response, id);
		return;
	}

	//POST REQUESTS (CREATE):
	if (/\/api\/products\/?$/.exec(request.url) && request.method === 'POST') {
		Controller.createProduct(request, response);
		return;
	}
	//PUT REQUESTS (UPDATE):
	if (
		/\/api\/products\/([\w-]+)/.exec(request.url) &&
		request.method === 'PUT'
	) {
		let id = /\/api\/products\/([\w-]+)/.exec(request.url)[1];
		Controller.updateProduct(request, response, id);
		return;
	}
	//DELETE REQUESTS (DELETE):
	if (
		/\/api\/products\/([\w-]+)/.exec(request.url) &&
		request.method === 'DELETE'
	) {
		let id = /\/api\/products\/([\w-]+)/.exec(request.url)[1];
		Controller.deleteProduct(request, response, id);
		return;
	}

	//IN CASE NO ENDPOINT MATCHES(BAD REQUEST)
	response.writeHead(404, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({ message: 'Bad request. (Route Not Found)' }));
};

server.on('request', api);

server.listen(PORT, () => {
	console.log('Listening on port:', PORT);
});
