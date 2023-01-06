const getAllContacts = require("./getAllContacts");
const getByIdContact = require("./getByIdContact");
const createContact = require("./createContact");
const updateByIdContact = require("./updateByIdContact");
const removeByIdContact = require("./removeByIdContact");
const updateStatusContact = require("./updateStatusContact");
module.exports = {
    getAllContacts,
    getByIdContact,
    createContact,
    updateByIdContact,
    removeByIdContact,
    updateStatusContact,
};
