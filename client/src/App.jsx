import { useState } from 'react';
import './App.css';
import AddFlight from './components/createFlight/AddFlight';
import Flights from './components/flights/Flights';
import RangeSlider from './components/Slider';
import FullWidthTabs from './components/tabs/Tabs';

function App() {
  const [flights, setFlights] = useState([]);
  return (
    <div className="App">
      <h1>Search Flights</h1>
      <AddFlight />
      <FullWidthTabs setFlights={setFlights} />
      <div className='slider_container'>
        <h4>Price Range *</h4>
        <p>Rs 1000/-</p>
        <RangeSlider flights={flights} setFlights={setFlights}/>
        <p>Rs 50000/-</p>
      </div>
      <Flights flights={flights} setFlights={setFlights} />
    </div>
  );
}

export default App;
