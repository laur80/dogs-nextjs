const fs = require('fs');
const path = require('path');

export function buildDogsFilePath(filename) {
	return path.join(process.cwd(), 'helpers', filename);
}

export function extractDogs(filePath) {
	const file = fs.readFileSync(filePath);
	const dogs = JSON.parse(file);
	return dogs;
}

const localAPI = (req, res) => {
	let filename = 'refresh.json';
	const filePath = buildDogsFilePath(filename);
	const dogs = extractDogs(filePath);

	if (req.method === 'GET') {
		res.status(200).json(dogs);
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
};
export default localAPI;
