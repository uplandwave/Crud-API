const express = require('express');
const router = express.Router();
const suppressorsController = require('../controllers/suppressors');
const { suppressorValidationSchema } = require('../validation/dataValidation');
const { isAuthenticated } = require("../middleware/authenticate");

function validateSuppressor(req, res, next) {
    const { error } = suppressorValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const validationErrors = error.details.map(err => err.message);
        return res.status(400).json({ errors: validationErrors });
    }
    next();
}

router.get('/', suppressorsController.getAllSuppressors);
router.get('/:id', suppressorsController.getSingleSuppressor);
router.post('/', isAuthenticated, validateSuppressor, suppressorsController.createSuppressor);
router.put('/:id', isAuthenticated, validateSuppressor, suppressorsController.updateSuppressor);
router.delete('/:id', isAuthenticated, suppressorsController.deleteSuppressor);

module.exports = router;
