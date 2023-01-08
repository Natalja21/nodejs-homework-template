const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const router = express.Router();
// signup
router.post(
    "/register",
    validateBody(schemas.registerShema),
    ctrlWrapper(ctrl.registerUser)
);
// signin
router.post(
    "/login",
    validateBody(schemas.loginShema),
    ctrlWrapper(ctrl.loginUser)
);
// get data by token
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
// logout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));
// update subscription
router.patch(
    "/subscription",
    authenticate,
    validateBody(schemas.subscriptionJoiSchema),
    ctrlWrapper(ctrl.updateSubscriptionUser)
);
// update avatar
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatarUser));

module.exports = router;
