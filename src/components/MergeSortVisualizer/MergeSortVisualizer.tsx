import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import MergeSort from '../../algorithms/MergeSort';
import Node from '../../model/Node';
import DataBar from '../DataBar/DataBar';
import VisualizationArea from '../VisualizationArea/VisualizationArea';
import { AnimateSharedLayout, motion } from 'framer-motion';
import './MergeSortVisualizer.css';
import { Button } from '@material-ui/core';

interface MergeSortVisualizerArgs {
  items: Node[];
  layout?: 'column' | 'row';
}

const MergeSortVisualizer = ({ items, layout }: MergeSortVisualizerArgs) => {
  const highestVal = items.reduce((prev, cur) => ((prev.value as number) > (cur.value as number) ? prev : cur))
    .value as number;

  return (
    <div className="merge-sort-visualizer" data-testid="MergeSortVisualizer">
      <Button>Shuffle!</Button>
      <Button>Sort!</Button>
      <VisualizationArea items={items} highestVal={highestVal} />
    </div>
  );
};

export default MergeSortVisualizer;
export type { MergeSortVisualizerArgs };
