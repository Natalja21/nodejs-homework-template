const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrent = require("./getCurrent");
const logoutUser = require("./logoutUser");
const verifyEmailUser = require("./verifyEmailUser");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    registerUser,
    loginUser,
    getCurrent,
    logoutUser,
    verifyEmailUser,
    resendVerifyEmail,
};
