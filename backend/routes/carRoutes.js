const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const carController = require('../controllers/carController');


router.get('/', protect, carController.getCars);


router.get('/:id', protect, carController.getCar);

router.post('/', protect, carController.createCar);

router.put('/:id', protect, carController.updateCar);

router.delete('/:id', protect, carController.deleteCar);

module.exports = router; 