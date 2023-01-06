const fs = require("fs/promises");
const path = require("path");
// const Jimp = require("jimp");

const { User } = require("../../models/user");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatarUser = async (req, res) => {

    const { path: tempUpload, originalname } = req.file;
    console.log(req.file);
    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", originalname);
    const { _id } = req.user;
    await User.findByIdAndUpdate(
        _id,
        { avatarURL },
        {
            new: true,
        }
    );
    res.json({
        avatarURL,
    })
};

module.exports = updateAvatarUser;
