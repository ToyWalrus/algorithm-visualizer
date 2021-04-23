import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataBar from '../components/DataBar/DataBar';
import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Like this!
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      {/* <Bars /> */}
      <div style={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
        <MergeSortVisualizer list={[]} />
      </div>
    </div>
  );
}

export default App;
