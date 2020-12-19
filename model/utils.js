const fs = require('fs');

const writeDataToFile = async function (filename, content) {
	await fs.writeFileSync(filename, content, (err) => {
		if (err) throw err;
	});
};

module.exports = { writeDataToFile };
