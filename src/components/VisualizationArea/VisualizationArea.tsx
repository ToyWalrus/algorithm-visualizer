import React, { useEffect, useState } from 'react';
import Node from '../../model/Node';
import DataBar from '../DataBar/DataBar';
import './VisualizationArea.css';

interface VisualizationAreaArgs {
  bars: Node[];
  highestVal: number;
}

const VisualizationArea = (args: VisualizationAreaArgs) => {
  let [bars, setBars] = useState(args.bars);
  useEffect(() => {
    setTimeout(() => {
      // setBars(
      //   bars.map((val) => {
      //     val.isBeingSorted = !val.isBeingSorted;
      //     return val;
      //   })
      // );
    }, 1000);
  });
  return (
    <div className="VisualizationArea" data-testid="VisualizationArea">
      {bars.map((val, idx) => (
        <DataBar value={(val.value as number) / args.highestVal} color={val.color} index={idx} renderValue={false} />
      ))}
    </div>
  );
};

export default VisualizationArea;
export type { VisualizationAreaArgs };
