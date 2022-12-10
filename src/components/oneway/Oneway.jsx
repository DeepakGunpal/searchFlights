import React, { useState } from 'react'
import oneWayIcon from '../../assets/one-way.png'
import './Oneway.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { axiosInstance } from '../../config';

const Oneway = ({ setFlights }) => {


    const [flightQueryData, setFlightQueryData] = useState({
        originCity: "",
        destinationCity: "",
        departureDate: ""

    });

    const handleInput = ({ target: { name, value } }) => {
        setFlightQueryData({ ...flightQueryData, [name]: value })
    };

    const newFlight = async ({ originCity, destinationCity, departureDate }) => {
        const res = await axiosInstance.get(`/queryFlight?originCity=${originCity}&destinationCity=${destinationCity}&departureDate=${departureDate}`)
            .catch((err) => {
                window.alert(Object.values(err.response.data.message)[0]);
            })
        setFlights(res.data.data);
    }

    const handleQuery = () => {
        const newFlightData = { ...flightQueryData }
        newFlight(newFlightData);
        setFlightQueryData("");
    };

    return (
        <div className='oneway_container'>
            <span className='search_fields_container'>
                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Origin City"
                    name="originCity"
                    required
                    type='text'
                />

                <TextField
                    className="search"
                    onChange={handleInput}
                    label="Destination City"
                    name="destinationCity"
                    required
                    type='text'
                />
                <span className='date_container'>
                    <span>Departure Date *</span>
                    <TextField
                        className="search"
                        onChange={handleInput}
                        name="departureDate"
                        required
                        fullWidth
                        type='date'
                    />
                </span>
            </span>
            <div className='button_img_container'>
                <Button
                    variant="contained"
                    onClick={handleQuery}
                    style={{
                        'fontWeight': 'bolder',
                        'fontSize': '20px',
                        'padding': '8px 25px',
                        'backgroundColor': '#FF8C00',
                        'color': 'black',
                        'border': '2px solid black',
                    }}>
                    Search
                </Button>
                <a href="https://www.flaticon.com/free-icons/one-way" title="one way icons" target='blank'><img src={oneWayIcon} alt='one-way-icon' /></a>
            </div>

        </div>
    )
}

export default Oneway