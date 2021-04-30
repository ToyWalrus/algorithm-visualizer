import { useState } from 'react';

const useForceUpdate = () => {
  let [internalState, setInternalState] = useState(0);
  return () => {
    setInternalState(internalState + 1);
  };
};

export default (() => useForceUpdate)();
