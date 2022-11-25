import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { useState } from 'react';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ flights, setFlights }) {
  const [value, setValue] = useState([2000, 25000]);
  const [actualFlights, setActualFlights] = useState([]);

  const refinedFlights = (flights) => {
    if (actualFlights.length < flights.length) setActualFlights(flights);
    const refFlights = actualFlights.filter(flight => value[0] < flight.price && flight.price < value[1]);
    setFlights(refFlights);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    refinedFlights(flights);
  }, [value]);

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1000}
        step={500}
        max={50000}
      />
    </Box>
  );
}
