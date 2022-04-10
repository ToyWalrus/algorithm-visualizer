import React from 'react';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';
import MergeSort from 'algorithms/MergeSort';

const MergeSortVisualizer = (props: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			<VisualizationArea {...props} title="Merge Sort" sorter={new MergeSort()} />
		</div>
	);
};

export default MergeSortVisualizer;
