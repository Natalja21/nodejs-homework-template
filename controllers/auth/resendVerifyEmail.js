const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "missing required field email");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: "Підтвердження реєстрації на сайті",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target= "_blank" >Нажміть для підтвердження</a>`,
    };
    await sendEmail(mail);
    res.json({
        message: "Verification email sent",
    });
};

module.exports = resendVerifyEmail;
