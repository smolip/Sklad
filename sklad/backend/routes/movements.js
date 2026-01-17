const express = require('express');
const router = express.Router();
const movementController = require('../controllers/invMovementController');

// Definice tras
router.get('/', movementController.getAllMovements);
router.get('/:id', movementController.getMovementById);
router.post('/', movementController.createMovement);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);

module.exports = router;
