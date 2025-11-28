let ContactModel = require('../models/contacts');

module.exports.create = async function (req, res, next) {

    try {

        console.log("body: " + req.body);

        let newContact = await ContactModel.create(req.body);

        console.log(newContact);

        res.json(req.body);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await ContactModel.find();

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.contactByID = async function (req, res, next) {
    try {

        let contact = await ContactModel.findOne({ _id: req.params.id })

        res.json(contact);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.update = async function (req, res, next) {
    try {

        console.log("body: " + req.body);

        let updatedContact = ContactModel(req.body);
        updatedContact._id = req.params.id;

        let result = await ContactModel.updateOne({ _id: req.params.id }, updatedContact);

        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Contact updated successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Contact not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let result = await ContactModel.deleteOne({ _id: req.params.id });

        console.log(result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Contact deleted successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Contact not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}