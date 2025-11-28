const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
    {
        item: String,
        qty: Number,
        tags: [],
        status: String,
        size: {
            h: Number,
            w: Number,
            uom: String
        },
        // Adds relationship with User
        owner: String
    },
    {
        collection: "inventory"
    }
);

// Ensure virtual fields are serialised.
InventorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);