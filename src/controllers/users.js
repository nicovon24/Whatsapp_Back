const { users } = require("../db");

const getAllUsers = async (req, res) => {
	try {
		const find = await users.findAll();

		res.status(200).json(find);
	} catch (error) {
		res.status(400).json(error);
	}
};

const postUsers = async (req, res) => {
	try {
		const { name, image, allChats, email, password } = req.body;
		await users.create({ name, image, allChats, email, password });
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(400).json(error);
	}
};
module.exports = { getAllUsers, postUsers };
