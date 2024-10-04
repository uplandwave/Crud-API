const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGuns = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('guns').find().toArray();
        res.status(204).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving guns', error: err });
    }
};

const getSingleGun = async (req, res) => {
    try {
        const gunId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('guns').findOne({ _id: gunId });

        if (result) {
            res.status(204).json(result);
        } else {
            res.status(404).json({ message: 'Gun not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving gun', error: err });
    }
};

const createGun = async (req, res) => {
    try {
        const response = await mongodb.getDatabase().db().collection('guns').insertOne(req.body);

        if (response.acknowledged) {
            res.status(204).json({ message: 'Gun created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create gun' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating gun', error: err });
    }
};

const updateGun = async (req, res) => {
    try {
        const gunId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('guns').replaceOne({ _id: gunId }, req.body);

        if (response.modifiedCount > 0) {
            res.status(204).json({ message: 'Gun updated successfully' });
        } else {
            res.status(404).json({ message: 'Gun not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating gun', error: err });
    }
};

const deleteGun = async (req, res) => {
    try {
        const gunId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('guns').deleteOne({ _id: gunId });

        if (response.deletedCount > 0) {
            res.status(204).json({ message: 'Gun deleted successfully' });
        } else {
            res.status(404).json({ message: 'Gun not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting gun', error: err });
    }
};

module.exports = {
    getAllGuns,
    getSingleGun,
    createGun,
    updateGun,
    deleteGun,
};
