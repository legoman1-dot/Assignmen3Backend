const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserFBSchema = new Schema(
    {
        uid: {
            type: String,
            unique: true,
            required: "Uid is required",
        },
        displayName: String,
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
        },
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        },
        admin: {
            type: Boolean,
            default: false
        }

    },
    {
        collection: "usersfb"
    }
);

// Ensure virtual fields are serialised.
UserFBSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model('UserFB', UserFBSchema);