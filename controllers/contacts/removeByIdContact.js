const { Contact } = require("../../models/contacts");

const removeByIdContact = async (req, res, next) => {
    const { contactId } = req.params;
    await Contact.findByIdAndRemove(contactId);
    res.json({
        message: "contact deleted",
    });
};

module.exports = removeByIdContact;