const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const mail = {
        to: email,
        subject: "Підтвердження реєстрації на сайті",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target= "_blank" >Нажміть для підтвердження</a>`,
    };
    await sendEmail(mail);
    const newUser = await User.create({
        ...req.body,
        password: passwordHash,
        avatarURL,
    });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
    });
};
module.exports = registerUser;
