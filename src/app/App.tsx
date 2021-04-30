import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';
import { motion } from 'framer-motion';
import Scaffold from '../components/Scaffold/Scaffold';

// https://www.framer.com/api/motion/animation/
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 500);
  });

  return (
    <Scaffold title="Algorithm Visualizer" hideSideNav={true}>
      <motion.div
        onClick={() => setCount(count + 1)}
        key={count}
        style={{ position: 'absolute', top: '25vh', left: '35%', height: '50vh', width: '50vh' }}
        initial={count % 2 === 1 ? 'one' : 'two'}
        animate={count % 2 === 0 ? 'one' : 'two'}
        variants={{
          one: { background: '#999', borderRadius: '50%' },
          two: { background: '#eee', borderRadius: '5%', rotate: (360 / 8) * 3 },
        }}
        transition={{ duration: 0.45 }}
      />
    </Scaffold>
  );
}

export default App;
