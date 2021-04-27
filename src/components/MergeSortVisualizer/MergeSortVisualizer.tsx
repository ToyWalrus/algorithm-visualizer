import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import MergeSort from '../../algorithms/MergeSort';
import Node from '../../model/Node';
import DataBar from '../DataBar/DataBar';
import VisualizationArea from '../VisualizationArea/VisualizationArea';
import './MergeSortVisualizer.css';

interface MergeSortVisualizerArgs {
  list: Node[];
  layout?: 'column' | 'row';
}

const MergeSortVisualizer = ({ list: initialList, layout }: MergeSortVisualizerArgs) => {
  layout = layout || 'column';
  const highestVal = 50;
  let sorter: MergeSort;
  let [list, setList] = useState(initialList);

  useEffect(() => {
    for (let i = 0; i < highestVal; ++i) {
      list.push(new Node({ value: i + 1 }));
    }
    // shuffle(list);
    // sorter = new MergeSort(
    //   (a, b) => {
    //     if (a.value < b.value) return -1;
    //     return 1;
    //   },
    //   100,
    //   () => {
    //     setList(list);
    //   }
    // );
    // sorter.sort(list);
  });

  return (
    <div className="MergeSortVisualizer" data-testid="MergeSortVisualizer">
      <VisualizationArea bars={list} highestVal={highestVal} />
    </div>
  );
};

export default MergeSortVisualizer;
export type { MergeSortVisualizerArgs };
