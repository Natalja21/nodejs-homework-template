const getAllContacts = require("./getAll");
const getByIdContact = require("./getById");
const createContact = require("./createContact");
const updateByIdContact = require("./updateById");
const removeByIdContact = require("./removeById");
const updateStatusContact = require("./updateStatusContact");
module.exports = {
    getAllContacts,
    getByIdContact,
    createContact,
    updateByIdContact,
    removeByIdContact,
    updateStatusContact,
};