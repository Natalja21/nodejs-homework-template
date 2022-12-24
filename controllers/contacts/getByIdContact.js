const { Contact } = require("../../models/contacts");
const getByIdContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    res.json(result);
};

module.exports = getByIdContact;