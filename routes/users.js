const express = require('express');
const router = express.Router();
const usersControler = require('../controllers/users');
const { userValidationSchema } = require('../validation/dataValidation');

function validateData(req, res, next) {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationErrors = error.details.map(err => err.message);
      return res.status(400).json({ errors: validationErrors });
    }
    next();
  }

router.get( '/', usersControler.getAll);
router.get( '/:id', usersControler.getSingle);
router.post('/', validateData, usersControler.createUser);
router.put('/:id', validateData, usersControler.updateUser);
router.delete( '/:id', usersControler.deleteUser);

module.exports = router;