let InventoryModel = require('../models/inventory');
let UserModel = require('../models/users');

module.exports.create = async function (req, res, next) {

    try {

        console.log("body: " + req.body);
        
        let newItem = req.body;
        newItem.tags = req.body.tags.split(",").map(word => word.trim());
        newItem.owner = req.auth.uid;

        let result = await InventoryModel.create(newItem);
        console.log(result);

        res.json(result);

    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.list = async function (req, res, next) {
    try {
        let list = await InventoryModel.find().populate('owner');

        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.inventoryByID = async function (req, res, next) {
    try {

        let inventory = await InventoryModel.findOne({ _id: req.params.id })

        res.json(inventory);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.update = async function (req, res, next) {
    try {

        console.log("body: " + req.body);

        let updatedInventory = InventoryModel(req.body);
        updatedInventory._id = req.params.id;

        let result = await InventoryModel.updateOne({ _id: req.params.id }, updatedInventory);

        console.log(result);
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Inventory updated successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Inventory not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let result = await InventoryModel.deleteOne({ _id: req.params.id });

        console.log(result);
        if (result.deletedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "Inventory deleted successfully."
                }
            );
        } else {
            // Express will catch this on its own.
            throw new Error('Inventory not deleted. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports.hasAuthorization = async function(req, res, next){

    try {
        let id = req.params.id
        let inventoryItem = await InventoryModel.findById(id);
        console.log(inventoryItem);

        // If there is no item found.
        if (inventoryItem == null) {
            throw new Error('Item not found.') // Express will catch this on its own.
        }
        else if (inventoryItem.owner != null) { // If the item found has a owner.

            if (inventoryItem.owner != req.auth.uid) { // If the owner differs.

                let currentUser = await UserModel.findOne({uid: req.auth.uid}, 'admin');
  
                if(currentUser.admin != true){ // If the user is not a Admin

                    console.log('====> Not authorized');
                    return res.status(403).json(
                        {
                            success: false,
                            message: 'User is not authorized to modify this item.'
                        }
                    );
                }
            }
        }

        // If it reaches this point, runs the next middleware.
        next();
    } catch (error) {
        console.log(error);   
        next(error);
    }
}