const Car = require('../models/Car');

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    // Ensure we're returning an array even if MongoDB returns null or undefined
    res.json(Array.isArray(cars) ? cars : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific car
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { make, model, year, description, price, availability } = req.body;
    
    const newCar = new Car({
      make,
      model,
      year,
      description,
      price,
      availability,
      user: req.user.id
    });
    
    const car = await newCar.save();
    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const { make, model, year, description, price, availability } = req.body;
    
    // Build car object
    const carFields = {};
    if (make) carFields.make = make;
    if (model) carFields.model = model;
    if (year) carFields.year = year;
    if (description) carFields.description = description;
    if (price) carFields.price = price;
    if (availability) carFields.availability = availability;
    
    let car = await Car.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: carFields },
      { new: true }
    );
    
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    await Car.findByIdAndRemove(req.params.id);
    
    res.json({ message: 'Car removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 