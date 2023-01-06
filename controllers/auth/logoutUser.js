const { User } = require("../../models/user");

const logoutUser = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: "No Content",
    });
};

module.exports = logoutUser;
