import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AddFlight.css'
import { axiosInstance } from '../../config';

export default function AddFlight() {
    const [open, setOpen] = useState(false);

    const [newFlightDetails, setNewFlightDetails] = useState({
        name: "",
        originCity: "",
        destinationCity: "",
        departureDate: "",
        returnDate: "",
        departureTime: "",
        arrivalTime: "",
        price: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const newFlight = async (data) => {
        console.log(data);
        const res = await axiosInstance.post('/createFlight', data)
            .catch((err) => {
                window.alert(Object.values(err.response.data.message)[0]);
            })
        if (res.status === 201) window.alert("Flight added");
    }

    const handleAdd = () => {
        const newFlightData = { ...newFlightDetails }
        newFlight(newFlightData);
        setNewFlightDetails("");
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = ({ target: { name, value } }) => {
        setNewFlightDetails({ ...newFlightDetails, [name]: value })
    };

    return (
        <div className='add_flight_button'>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{
                    'fontWeight': 'bolder',
                    'fontSize': '15px',
                    'padding': '8px 15px',
                    'backgroundColor': 'black'
                }}
            >
                Add Flight
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Flight</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                        Important : <br />
                        1.) Feilds marked as * are Mandatory. <br />
                        <br />
                    </DialogContentText>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem' }}>
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Origin City"
                            name="originCity"
                            required
                            type='text'
                            fullWidth
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Destination City"
                            name="destinationCity"
                            required
                            fullWidth
                            type='text'
                        />

                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: 'large' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            label="Name"
                            name="name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            autoComplete='off'
                            required
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            variant="outlined"
                            autoComplete='off'
                            required
                        />
                        <span>Departure Date* : </span>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            name="departureDate"
                            required
                            fullWidth
                            type="date"
                            variant="outlined"
                            autoComplete='off'
                        />
                        <span>Return Date* : </span>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            name="returnDate"
                            type="date"
                            fullWidth
                            variant="outlined"
                            autoComplete='off'
                        />
                        <span>Departure Time* : </span>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            name="departureTime"
                            required
                            fullWidth
                            type="Time"
                            variant="outlined"
                            autoComplete='off'
                        />
                        <span>Arrival Time* : </span>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={handleInput}
                            name="arrivalTime"
                            type="Time"
                            fullWidth
                            variant="outlined"
                            autoComplete='off'
                        />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}