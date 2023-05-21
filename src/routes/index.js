const { Router } = require("express");
const router = Router();
const users = require("./users");
const chats = require("./chats");

router.use("/users", users);
router.use("/chats", chats);

module.exports = router;
