import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import { Button, Typography } from '@material-ui/core';
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
  title?: string;
}

let timer: NodeJS.Timeout | undefined;

const VisualizationArea = ({ title, ...args }: VisualizationAreaArgs) => {
  const { onResetClick, highestVal, items, onSortStepClick, onStartClick, onStopClick } =
    useVisualizationAreaHook(args);

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
      {title && (
        <Typography className="title" color="primary" variant="h1">
          {title}
        </Typography>
      )}
      <AnimateSharedLayout>
        <div className="data-bars">
          {items.map((node, idx) => (
            <DataBar {...getDataBarArgs(node, highestVal)} key={'db_' + node.id + '_' + idx.toString()} />
          ))}
        </div>
      </AnimateSharedLayout>
    </div>
  );
};

const useVisualizationAreaHook = ({ items: initialItems, sorter, sortStepDelay }: VisualizationAreaArgs) => {
  let [items, setItems] = useState(initialItems);
  let [sortIterator, setSortIterator] = useState(sorter.sort(items));
  let forceUpdate = useForceUpdate();
  let highestVal = 0;

  if (initialItems && initialItems.length) {
    highestVal = initialItems.reduce((prev, cur) => ((prev.value as number) > (cur.value as number) ? prev : cur))
      .value as number;
  }

  const onSortStepClick = (): boolean => {
    if (sortIterator && !sortIterator.next().done) {
      forceUpdate();
      return true;
    } else {
      onStopClick();
      return false;
    }
  };

  const onStopClick = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const onStartClick = () => {
    const stepFunction = () => {
      return setTimeout(() => {
        if (onSortStepClick()) {
          timer = stepFunction();
        } else {
          items.forEach(node => {
            node.isBeingSorted = false;
          });
          forceUpdate();
        }
      }, sortStepDelay || 200);
    };

    onStopClick();
    timer = stepFunction();
  };

  const onResetClick = () => {
    onStopClick();
    shuffle(items);
    items.forEach(node => {
      node.isBeingSorted = false;
    });
    setSortIterator(sorter.sort(items));
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems.length]);

  useEffect(() => {
    if (timer) {
      onStartClick();
    }
  }, [sortStepDelay]);

  return {
    items,
    onStartClick,
    onStopClick,
    onResetClick,
    onSortStepClick,
    highestVal,
  };
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
