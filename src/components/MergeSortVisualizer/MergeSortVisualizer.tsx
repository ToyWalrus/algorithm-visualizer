import React from 'react';
import MergeSort from '../../algorithms/MergeSort';
import Node from '../../model/Node';
import VisualizationArea from '../VisualizationArea/VisualizationArea';
import './MergeSortVisualizer.css';

interface MergeSortVisualizerArgs {
  items: Node[];
  layout?: 'column' | 'row';
}

const MergeSortVisualizer: React.FC<MergeSortVisualizerArgs> = ({ items, layout }) => {
  return (
    <div className="merge-sort-visualizer">
      <VisualizationArea
        items={items}
        sorter={
          new MergeSort((a, b) => {
            let v1 = a.value as number;
            let v2 = b.value as number;
            if (v1 < v2) return -1;
            if (v1 > v2) return 1;
            return 0;
          })
        }
      />
    </div>
  );
};

export default MergeSortVisualizer;
export type { MergeSortVisualizerArgs };
