import React from 'react';
import logo from './logo.svg';
import './App.css';
import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Button variant="contained" color="primary">
        Sort!
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
        <MergeSortVisualizer list={[]} />
      </div>
    </div>
  );
}

export default App;
