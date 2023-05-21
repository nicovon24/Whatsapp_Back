const { Server } = require("socket.io");

function init(httpServer) {
	io = new Server(httpServer, {
		// @ts-ignore
		method: "GET",
		cors: {
			origin: "*",
		},
	});
	return io;
}

function getIO() {
	if (!io) {
		throw new Error("Socket IO not defined!");
	}
	return io;
}

function emitSocket(type, params) {
	try {
		// @ts-ignore
		getIO().emit(type, params);
	} catch (error) {
		console.log(error);
	}
}

module.exports = { init, getIO, emitSocket };
