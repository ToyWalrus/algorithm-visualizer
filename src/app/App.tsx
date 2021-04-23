import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataBar from '../components/DataBar/DataBar';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. Like this!
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <Bars />
    </div>
  );
}

const Bars = () => (
  <div
    style={{
      height: '25vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    }}
  >
    {[0.1, 0.2, 0.3, 0.4, 0.7, 0.8].map((val, idx) => (
      <DataBar value={val} index={idx} renderValue={true} />
    ))}
  </div>
);

export default App;
