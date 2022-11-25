const flightModel = require("../model/flightModel");
const handleErrors = require("../utils/errorHandler");

const createFlight = async (req, res) => {
    try {
        req.body.price = req.body.price ? parseFloat(req.body.price) : '';
        console.log(req.body);
        if (req.body.departureDate < new Date(Date.now()).toISOString().split("T")[0]) {
            throw new Error('Invalid departure date');
        }

        if (req.body.departureDate > req.body.returnDate) {
            throw new Error('Return date must be after departure date');
        }

        if (req.body.originCity.toLowerCase().trim() === req.body.destinationCity.toLowerCase().trim()) {
            throw new Error('Origin And Destination Cannot be Same');
        }
        const flight = await flightModel.create(req.body);
        res.status(201).send({ status: true, data: flight });
    } catch (error) {
        const err = handleErrors(error)
        res.status(400).send({ status: false, message: err });
    }
}

const fetchFlightData = async (req, res) => {
    try {
        const flights = await flightModel.find();
        res.status(200).send({ status: true, count: flights.length, data: flights });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, message: error.message });

    }
}

const queryFlight = async (req, res) => {
    try {
        const { originCity, destinationCity, departureDate } = req.query;
        if (departureDate != '' && departureDate != 'undefined') {
            if (departureDate < new Date(Date.now()).toISOString().split("T")[0]) {
                throw new Error('Invalid departure date');
            }
        } else {
            delete req.query.departureDate;
        }
        (originCity != '' && originCity != 'undefined') ? originCity : delete req.query.originCity;
        (destinationCity != '' && destinationCity != 'undefined') ? destinationCity : delete req.query.destinationCity;

        if (req.query.originCity) {
            if (originCity.toLowerCase().trim() === destinationCity.toLowerCase().trim()) {
                throw new Error('Origin And Destination Cannot be Same');
            }
        }

        const flight = await flightModel.find(req.query);
        res.status(200).send({ status: true, count: flight.length, data: flight });
    } catch (error) {
        const err = handleErrors(error)
        res.status(400).send({ status: false, message: err });
    }
}

const queryTwoWayFlight = async (req, res) => {
    try {
        const { originCity, destinationCity, departureDate, returnDate } = req.query;
        if (departureDate != '' && departureDate != 'undefined') {
            if (departureDate < new Date(Date.now()).toISOString().split("T")[0]) {
                throw new Error('Invalid departure date');
            }
        } else {
            delete req.query.departureDate;
        }

        if (returnDate != '' && returnDate != 'undefined') {
            console.log(departureDate, returnDate)
            if (departureDate != '' && departureDate != 'undefined') {
                if (departureDate > returnDate) {
                    throw new Error('Return date must be after departure date');
                }
            }
        } else {
            delete req.query.returnDate;
        }

        (originCity != '' && originCity != 'undefined') ? originCity : delete req.query.originCity;
        (destinationCity != '' && destinationCity != 'undefined') ? destinationCity : delete req.query.destinationCity;

        if (req.query.originCity) {
            if (originCity.toLowerCase().trim() === destinationCity.toLowerCase().trim()) {
                throw new Error('Origin And Destination Cannot be Same');
            }
        }

        const flight = await flightModel.find({ $or: [req.query, { departureDate: { $in: [returnDate, departureDate] } }] });
        res.status(200).send({ status: true, count: flight.length, data: flight });
    } catch (error) {
        const err = handleErrors(error);
        res.status(400).send({ status: false, message: err });
    }
}
module.exports = { createFlight, fetchFlightData, queryFlight, queryTwoWayFlight };