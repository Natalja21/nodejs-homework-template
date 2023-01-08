const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatarUser = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    await Jimp.read(`${tempUpload}`)
        .then(image => {
            return image
                .resize(250, 250)
                .write(`${tempUpload}`);
        })
        .catch(err => {
            console.error(err.message);
        });

    const resultUpload = path.join(avatarDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", originalname);
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
