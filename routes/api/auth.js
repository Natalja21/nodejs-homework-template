const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const ctrUser = require("../../controllers/user");

const router = express.Router();
// signup
router.post(
    "/register",
    validateBody(schemas.registerShema),
    ctrlWrapper(ctrl.registerUser)
);
// verify
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmailUser));
// resend varify email
router.post(
    "/verify/",
    validateBody(schemas.verifyEmailShema),
    ctrlWrapper(ctrl.resendVerifyEmail)
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
    ctrlWrapper(ctrUser.updateSubscriptionUser)
);
// update avatar
router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    ctrlWrapper(ctrUser.updateAvatarUser)
);

module.exports = router;
