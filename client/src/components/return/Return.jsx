import React, { useState } from 'react'
import twoWayIcon from '../../assets/two-way.png'
import './Return.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { axiosInstance } from '../../config';

const Return = ({ setFlights }) => {

    const [flightQueryData, setFlightQueryData] = useState({
        originCity: "",
        destinationCity: "",
        departureDate: "",
        returnDate: "",

    });

    const handleInput = ({ target: { name, value } }) => {
        setFlightQueryData({ ...flightQueryData, [name]: value })
    };

    const newFlight = async ({ originCity, destinationCity, departureDate, returnDate }) => {
        const res = await axiosInstance.get(`/queryTwoWayFlight?originCity=${originCity}&destinationCity=${destinationCity}&departureDate=${departureDate}&returnDate=${returnDate}`)
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
        <div className='twoway_container'>
            <div className='return_search_fields_container'>
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
                <br />
                <div >
                    <span>Departure Date *</span>
                    <TextField
                        className="search"
                        onChange={handleInput}
                        name="departureDate"
                        required
                        fullWidth
                        type='date'
                    />
                </div>
                <div>
                    <span>Return Date *</span>
                    <TextField
                        className="search"
                        onChange={handleInput}
                        name="returnDate"
                        fullWidth
                        required
                        type='date'
                    />
                </div>
            </div>
            <div className='two_button_img_container'>
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
                <a href="https://www.flaticon.com/free-icons/one-way" title="one way icons" target='blank'><img src={twoWayIcon} alt='one-way-icon' /></a>
            </div>

        </div>
    )
}

export default Return