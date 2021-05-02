import { useState } from 'react';

const useForceUpdate = () => {
  let [_, setInternalState] = useState(0);
  return () => {
    setInternalState(state => state + 1);
  };
};

export default useForceUpdate;
