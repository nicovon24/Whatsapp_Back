const { chats } = require("../db");

const getAllChats = async (req, res) => {
	try {
		const find = await chats.findAll();

		//*ordering by the most recent messages
		const sort = find.sort((a, b) => {
			const chatsA = a.allChats[a.allChats.length - 1];
			const chatsB = b.allChats[b.allChats.length - 1];
			return new Date(chatsB.date) - new Date(chatsA.date);
		});

		res.status(200).json(sort);
	} catch (error) {
		res.status(400).json(error);
	}
};

const postChats = async (req, res) => {
	try {
		const { name, image } = req.body;
		const newData = {
			name,
			image,
			allChats: [
				{
					message: `Welcome to the conversation with ${name}`,
					person: "Other",
					date: new Date(),
				},
			],
		};
		await chats.create(newData);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(400).json(error);
	}
};

//*adding a message to chats
const sendMessage = async (req, res) => {
	try {
		const { message, person } = req.body;
		const { id } = req.params;
		const find = await chats.findOne({
			where: { id },
		});
		const { allChats } = find.dataValues;
		const arr = [
			...allChats,
			{ message, person, date: new Date() },
			// { message: "Mensaje de prueba", person: "Other", date: new Date() },
		];
		const response = await chats.update(
			{ allChats: arr },
			{
				where: { id: id },
			}
		);

		res.status(200).json({ success: true, data: response.data });
	} catch (error) {
		res.status(400).json(error);
	}
};

// const replyMessage = async (allChats, res) => {
// 	try {
// 		// res.status(200).json({ success: true });
// 	} catch (error) {
// 		// res.status(400).json(error);
// 	}
// };

const deleteChat = async (req, res) => {
	try {
		const { id } = req.params;
		const find = await chats.findOne({ where: { id } });
		if (find) {
			await chats.destroy({ where: { id } });
			res.status(200).json({ success: true });
		} else {
			throw new Error(`Chat with id ${id} does not exist`);
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

module.exports = { getAllChats, postChats, sendMessage, deleteChat };
