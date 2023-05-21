const { Router } = require("express");
const {
	getAllChats,
	postChats,
	sendMessage,
	deleteChat,
} = require("../controllers/index");

const router = Router();

router.get("/", async (req, res) => {
	getAllChats(req, res);
});

router.post("/", async (req, res) => {
	postChats(req, res);
});

router.put("/:id", async (req, res) => {
	sendMessage(req, res);
});

router.delete("/:id", async (req, res) => {
	deleteChat(req, res);
});

module.exports = router;
