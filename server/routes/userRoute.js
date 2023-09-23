const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

router.post("/login", userController.login);
router.post("/register", requireAuth, userController.register);

module.exports = router;
