const { User } = require("../../models/user");

const updateSubscriptionUser = async (req, res) => {
    const { _id } = req.user;
    const subscription = req.body.subscription;
    const result = await User.findByIdAndUpdate(
        _id,
        { subscription },
        {
            new: true,
        }
    );
    res.json(result);
};

module.exports = updateSubscriptionUser;
