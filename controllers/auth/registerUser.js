const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar")

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: passwordHash, avatarURL });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
    });
};
module.exports = registerUser;
