const express = require('express');
const router = express.Router();
const gunsController = require('../controllers/guns');
const { gunValidationSchema } = require('../validation/dataValidation');
const { isAuthenticated } = require("../middleware/authenticate");

function validateGun(req, res, next) {
    const { error } = gunValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const validationErrors = error.details.map(err => err.message);
        return res.status(400).json({ errors: validationErrors });
    }
    next();
}

router.get('/', gunsController.getAllGuns);
router.get('/:id', gunsController.getSingleGun);
router.post('/', isAuthenticated, validateGun, gunsController.createGun);
router.put('/:id', isAuthenticated, validateGun, gunsController.updateGun);
router.delete('/:id', isAuthenticated, gunsController.deleteGun);

module.exports = router;
