const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth")

const router = express.Router();
// signup
router.post("/register", validateBody(schemas.registerShema), ctrlWrapper(ctrl.registerUser));
// signin
router.post("/login", validateBody(schemas.loginShema), ctrlWrapper(ctrl.loginUser))
module.exports = router;