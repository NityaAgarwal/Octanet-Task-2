const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, 
        email, 
        phone,
    user_id: req.user.id,});
    res.status(201).json(contact);
});

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesnt have permission to update other user's contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Get contact 
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//@desc Delete contact 
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesnt have permission to update other user's contacts");
    }

    // await contact.remove();
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
});

module.exports = {
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact
};