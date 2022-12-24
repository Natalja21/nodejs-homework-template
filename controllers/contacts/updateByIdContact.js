const { Contact } = require("../../models/contacts");
const updateByIdContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    res.json(result);
};

module.exports = updateByIdContact;