import React from 'react';
import QuickSort from 'algorithms/QuickSort';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';

const QuickSortVisualizer = (props: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			{/* Display the pivot number as well as bar values */}
			<VisualizationArea {...props} title="Quick Sort" sorter={new QuickSort()} />
		</div>
	);
};

export default QuickSortVisualizer;
