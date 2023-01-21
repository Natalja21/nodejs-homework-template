const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const query = { owner };
    if (typeof favorite !== "undefined") {
        query.favorite = favorite;
    }
    // query.favorite = favorite ? favorite : { $in: [true, false] };
    const result = await Contact.find(query, "-createdAt -updatedAt", {
        skip,
        limit,
    }).populate("owner", "email subscription");
    res.json(result);
};

module.exports = getAllContacts;
