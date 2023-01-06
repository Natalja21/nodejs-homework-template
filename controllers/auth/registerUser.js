const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: passwordHash });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};
module.exports = registerUser;
