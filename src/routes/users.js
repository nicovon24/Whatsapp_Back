const { Router } = require("express");
const { getAllUsers, postUsers } = require("../controllers/index");

const router = Router();

router.get("/", async (req, res) => {
	getAllUsers(req, res);
});

router.post("/", async (req, res) => {
	postUsers(req, res);
});

module.exports = router;
