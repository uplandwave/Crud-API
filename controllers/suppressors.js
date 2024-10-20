const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllSuppressors = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('suppressors').find().toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving suppressors', error: err });
    }
};

const getSingleSuppressor = async (req, res) => {
    try {
        const suppressorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('suppressors').findOne({ _id: suppressorId });

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Suppressor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving suppressor', error: err });
    }
};

const createSuppressor = async (req, res) => {
          /*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create a new suppressor',
      required: true,
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Banish 30' },
          caliber: { type: 'string', example: '.30 and smaller' },
          weight_oz: { type: 'number', example: 13.2 },
          material: { type: 'string', example: 'Titanium and Aluminum' }
        }
      }
    }
  */
    try {
        const response = await mongodb.getDatabase().db().collection('suppressors').insertOne(req.body);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Suppressor created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create suppressor' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating suppressor', error: err });
    }
};

const updateSuppressor = async (req, res) => {
/*
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Change suppressor',
      required: true,
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Banish 30' },
          caliber: { type: 'string', example: '.30 and smaller' },
          weight_oz: { type: 'number', example: 13.2 },
          material: { type: 'string', example: 'Titanium and Aluminum' }
        }
      }
    }
*/
    try {
        const suppressorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('suppressors').replaceOne({ _id: suppressorId }, req.body);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Suppressor updated successfully' });
        } else {
            res.status(404).json({ message: 'Suppressor not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating suppressor', error: err });
    }
};

const deleteSuppressor = async (req, res) => {
    try {
        const suppressorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('suppressors').deleteOne({ _id: suppressorId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Suppressor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Suppressor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting suppressor', error: err });
    }
};

module.exports = {
    getAllSuppressors,
    getSingleSuppressor,
    createSuppressor,
    updateSuppressor,
    deleteSuppressor,
};
