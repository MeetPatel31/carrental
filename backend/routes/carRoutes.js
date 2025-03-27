const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const carController = require('../controllers/carController');

// @route   GET api/cars
// @desc    Get all cars
// @access  Private
router.get('/', protect, carController.getCars);

// @route   GET api/cars/:id
// @desc    Get a specific car
// @access  Private
router.get('/:id', protect, carController.getCar);

// @route   POST api/cars
// @desc    Create a new car
// @access  Private
router.post('/', protect, carController.createCar);

// @route   PUT api/cars/:id
// @desc    Update a car
// @access  Private
router.put('/:id', protect, carController.updateCar);

// @route   DELETE api/cars/:id
// @desc    Delete a car
// @access  Private
router.delete('/:id', protect, carController.deleteCar);

module.exports = router; 