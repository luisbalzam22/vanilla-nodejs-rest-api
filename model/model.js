//THIS FILE WOULD REPRESENT (IN A LARGER SYSTEM) ALL THE FILES THAT COMPOUND A MODEL AND EXPORTS THE METHODS NECESSARY TO RETRIEVE, CLEANSE, NORMALIZE AND MODIFY THE DATA THE APPLICATION USES. MODELS DEAL WITH DATA

const path = require('path');
let data = require('../localdb/products.json'); //NOTE1: SINCE IT'S A JSON FILE, IT DOESN'T NEED TO BE EITHER READ IT THROUGH "fs" OR PARSE IT TO WORK WITH IT AS A REGULAR JS OBJECT-->Here, NodeJS automatically read the file, parse the content to a JSON object and assigns that to the left hand side variable. It’s as simple as that!//NOTE2: Sould implement singleton pattern for this one

const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('./utils.js');

//NOTE: SINCE WE'RE PRETENDING TO FETCH DATA FROM A DATABASE (PREFERABLY MONGO), ALL OF OUR METHODS WILL BE ASYNCHRONOUS
const findAll = async function () {
	return new Promise((resolve, reject) => {
		resolve(data);
	});
};

const findOne = async function (id) {
	let product = data.find((element) => element.id === id);
	return new Promise((resolve, reject) => {
		resolve(product);
	});
};

const createOne = async function (product) {
	const newId = uuidv4();
	const newProduct = { id: newId, ...product }; //normalizing new element for the "database" (using the uuidv4 to create automatic id)
	const databaseSizeBeforeAdding = data.length;
	data.push(newProduct); //adding to "database" (pt.1)
	await writeDataToFile(
		path.resolve(__dirname, '..', 'localdb', 'products.json'),
		JSON.stringify(data)
	); //adding to "database" (pt.2)
	data = require('../localdb/products.json');
	if (
		!(
			data.length > databaseSizeBeforeAdding &&
			data.find((element) => element.id === newId)
		)
	) {
		newProduct = null;
	}
	return new Promise((resolve, reject) => {
		resolve(newProduct);
	});
};

const updateOne = async function (id, body) {
	const itemToUpdate = data.find((element) => {
		return element.id == id;
	});

	if (itemToUpdate) {
		itemToUpdate.name = body.name || itemToUpdate.name;
		itemToUpdate.description = body.description || itemToUpdate.description;
		itemToUpdate.price = body.price || itemToUpdate.price;

		await writeDataToFile(
			path.resolve(__dirname, '..', 'localdb', 'products.json'),
			JSON.stringify(data)
		);
		data = require('../localdb/products.json');
	}
	return new Promise((resolve, reject) => {
		resolve(itemToUpdate);
	});
};

const deleteOne = async function (id) {
	const itemTodelete = data.find((element) => {
		return element.id == id;
	});
	data = data.filter((item) => {
		return item.id !== id;
	});

	if (
		!data.find((element) => {
			return element.id == id; //this return is only to determine the value of the "if"'s condition
		})
	) {
		await writeDataToFile(
			path.resolve(__dirname, '..', 'localdb', 'products.json'),
			JSON.stringify(data)
		);
		data = require('../localdb/products.json');
	}

	return new Promise((resolve, reject) => {
		resolve(itemTodelete);
	});
};

module.exports.Model = { findAll, findOne, createOne, updateOne, deleteOne };
