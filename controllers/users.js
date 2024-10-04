const { response } = require('express');
const mongodb = require('../data/databace');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabace().db().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabace().db().collection('users').findOne({ _id: userId });
        
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress
        };

        const response = await mongodb.getDatabace().db().collection('users').insertOne(user);
        
        if (response.acknowledged) {
            res.status(201).json({ message: 'User created successfully' });
            // res.status(201).json({ message: 'User created successfully', userId: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            ipaddress: req.body.ipaddress
        };

        const response = await mongodb.getDatabace().db().collection('users').replaceOne({ _id: userId }, user);
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabace().db().collection('users').deleteOne({ _id: userId });
        
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};