const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: { type: String },
    originCity: { type: String, required: [true, "Enter Origin City"], trim: true, lowercase: true },
    destinationCity: { type: String, required: [true, "Enter Destination City"], trim: true, lowercase: true },
    departureDate: { type: String, required: [true, "Enter departureDate"], trim: true, lowercase: true },
    returnDate: { type: String, required: [true, "Enter returnDate"], trim: true, lowercase: true },
    departureTime: { type: String, required: [true, "Enter departureTime"], trim: true },
    arrivalTime: { type: String, required: [true, "Enter arrivalTime"], trim: true },
    price: { type: Number, required: [true, "Enter Price"] }

}, { timestamps: true });

module.exports = mongoose.model('flight', flightSchema)
