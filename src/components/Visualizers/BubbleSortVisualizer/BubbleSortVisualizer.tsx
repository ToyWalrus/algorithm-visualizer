import React from 'react';
import BubbleSort from 'algorithms/BubbleSort';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';

const BubbleSortVisualizer = (props: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			<VisualizationArea {...props} title="Bubble Sort" sorter={new BubbleSort()} />
		</div>
	);
};

export default BubbleSortVisualizer;
