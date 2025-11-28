const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        }
    },
    {
        collection: "contacts"
    }
);

module.exports = mongoose.model('Contacts', ContactsSchema);