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
}

let timer: NodeJS.Timeout | undefined;

const VisualizationArea: React.FC<VisualizationAreaArgs> = ({ sorter, items: initialItems }) => {
  let [items] = useState(initialItems);
  let [sortIterator, setSortIterator] = useState(sorter.sort(items));

  const highestVal = items.reduce((prev, cur) => ((prev.value as number) > (cur.value as number) ? prev : cur))
    .value as number;

  let forceUpdate = useForceUpdate();

  const onStopClick = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const onStartClick = () => {
    startTimer();
  };

  const onResetClick = () => {
    onStopClick();
    shuffle(items);
    setSortIterator(sorter.sort(items));
  };

  const onSortStepClick = () => {
    if (sortIterator && !sortIterator.next().done) {
      forceUpdate();
    } else {
      onStopClick();
    }
  };

  const startTimer = () => {
    const stepFunction = (time: number) => {
      return setTimeout(() => {
        onSortStepClick();
        timer = stepFunction(time);
      }, time);
    };

    onStopClick();
    timer = stepFunction(200);
  };

  useEffect(() => {
    shuffle(items);
    items.forEach((node, idx) => {
      node.isBeingSorted = false;
      node.index = idx;
    });
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
          Reset
        </Button>
        <Button variant="contained" onClick={onSortStepClick}>
          Sort Step
        </Button>
      </div>
      <AnimateSharedLayout>
        <div className="data-bars">
          {items.map((val, idx) => (
            <DataBar {...getDataBarArgs(val, highestVal)} key={val.id + idx.toString()} />
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
