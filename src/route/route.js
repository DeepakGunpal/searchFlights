const express = require("express");
const { createFlight, fetchFlightData, queryFlight, queryTwoWayFlight } = require("../controller/flightController");
const route = express.Router();

route.post("/createFlight", createFlight);
route.get("/fetchFlights", fetchFlightData);
route.get("/queryFlight", queryFlight);
route.get("/queryTwoWayFlight", queryTwoWayFlight);

module.exports = route;