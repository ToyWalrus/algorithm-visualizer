import React, { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import { Button } from '@material-ui/core';
import DataBar, { DataBarArgs } from '../DataBar/DataBar';
import { AnimateSharedLayout } from 'framer-motion';
import SortAlgorithm from '../../algorithms/SortAlgorithm';
import useForceUpdate from '../../utils/useForceUpdate';
import Node from '../../model/Node';
import './VisualizationArea.css';

interface VisualizationAreaArgs {
  items: Node[];
  sorter: SortAlgorithm;
  sortStepDelay?: number;
}

let timer: NodeJS.Timeout | undefined;

const VisualizationArea: React.FC<VisualizationAreaArgs> = ({ sorter, items: initialItems, sortStepDelay }) => {
  let [items, setItems] = useState(initialItems);
  let [sortIterator, setSortIterator] = useState(sorter.sort(items));
  let forceUpdate = useForceUpdate();

  const highestVal = items.reduce((prev, cur) => ((prev.value as number) > (cur.value as number) ? prev : cur))
    .value as number;

  const onStopClick = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const onStartClick = () => {
    const stepFunction = (time: number) => {
      return setTimeout(() => {
        onSortStepClick();
        timer = stepFunction(time);
      }, time);
    };

    onStopClick();
    timer = stepFunction(sortStepDelay || 200);
  };

  const onResetClick = () => {
    onStopClick();
    shuffle(items);
    items.forEach(node => {
      node.isBeingSorted = false;
    });
    setSortIterator(sorter.sort(items));
  };

  const onSortStepClick = () => {
    if (sortIterator && !sortIterator.next().done) {
      setItems(items);
    } else {
      onStopClick();
    }
  };

  useEffect(() => {
    onResetClick();
  }, []);

  return (
    <div className="visualization-area">
      <div className="control-buttons">
        <Button variant="contained" onClick={onStartClick}>
          Start
        </Button>
        <Button variant="contained" onClick={onStopClick}>
          Stop
        </Button>
        <Button variant="contained" onClick={onResetClick}>
          Shuffle/Reset
        </Button>
        <Button variant="contained" onClick={onSortStepClick}>
          Sort Step
        </Button>
      </div>
      <AnimateSharedLayout>
        <div className="data-bars">
          {items.map((node, idx) => (
            <DataBar {...getDataBarArgs(node, highestVal)} key={node.id + idx.toString()} />
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

const getDataBarArgs = (node: Node, highestVal: number): DataBarArgs => {
  return {
    value: (node.value as number) / highestVal,
    uniqueId: `db_${node.id}`,
    color: node.color,
    index: node.index,
  };
};

export default VisualizationArea;
export type { VisualizationAreaArgs };
