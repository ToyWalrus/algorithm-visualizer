import React, { useEffect, useState } from 'react';
import Node from '../../model/Node';
import DataBar, { DataBarArgs } from '../DataBar/DataBar';
import './VisualizationArea.css';
import { AnimateSharedLayout } from 'framer-motion';

interface VisualizationAreaArgs {
  items: Node[];
  highestVal: number;
}

const VisualizationArea = (args: VisualizationAreaArgs) => {
  let [items, setItems] = useState(args.items);

  return (
    <AnimateSharedLayout>
      <ul className="visualization-area">
        {items.map((val, idx) => (
          <DataBar {...getDataBarArgs(val, args.highestVal)} />
        ))}
      </ul>
    </AnimateSharedLayout>
  );
};

const getDataBarArgs = (node: Node, highestVal: number): DataBarArgs => {
  return {
    value: (node.value as number) / highestVal,
    uniqueId: `db_${node.value}`, // will probs need a better id later since values can be the same
    color: node.color,
    index: node.index,
  };
};

export default VisualizationArea;
export type { VisualizationAreaArgs };
