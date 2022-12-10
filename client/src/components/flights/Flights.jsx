import React, { useEffect } from 'react'
import { axiosInstance } from '../../config';
import './Flights.css'

const Flights = ({ flights, setFlights }) => {
    const newFlight = async () => {
        const res = await axiosInstance.get(`/fetchFlights`)
            .catch((err) => {
                window.alert(Object.values(err.response.data.message)[0]);
            })
        setFlights(res.data.data);
    };

    useEffect(() => {
        newFlight();
    }, []);

    return (
        <div>
            <div className='flights_container'>
                <div className='flight_container_header'>
                    <h1>Date</h1>
                    <h1>Name</h1>
                    <h1>Departure</h1>
                    <h1>Arrival</h1>
                    <h1>Price</h1>
                </div>
                {
                    flights && flights.map(flight => (
                        <div className='flight_container' key={flight._id}>
                            <h2>{flight.departureDate}</h2>
                            <h2>{flight.name}</h2>
                            <h2>{flight.originCity} @ {flight.departureTime}</h2>
                            <h2>{flight.destinationCity} @ {flight.arrivalTime}</h2>
                            <h1>{flight.price}/-</h1>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Flights