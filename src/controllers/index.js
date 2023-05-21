const { getAllUsers, postUsers } = require("./users");
const { getAllChats, postChats, sendMessage, deleteChat } = require("./chats");

module.exports = {
	getAllUsers,
	postUsers,
	getAllChats,
	postChats,
	sendMessage,
	deleteChat
};
