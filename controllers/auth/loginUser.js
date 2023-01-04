const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!user || !passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

module.exports = loginUser;
