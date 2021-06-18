const { dogs } = require('./data.json');

export default (req, res) => {
	if (req.method === 'GET') {
		console.log(dogs);
		res.status(200).json(dogs);
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
};
