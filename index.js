const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Server } = require("socket.io");

const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

require("dotenv").config();

io.on("connection", () => {
	console.log("Client connected!");
});

conn
	.sync({ force: false })
	.then(async () => {
		server.listen(process.env.PORT, () => {
			console.log(`Listening at: http://localhost:${process.env.PORT}/`);
		});
	})
	.catch((error) => console.log(error.message));
