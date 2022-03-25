import React from 'react';
import QuickSort from 'algorithms/QuickSort';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';

const QuickSortVisualizer = (props: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			{/* Display the pivot number as well as bar values */}
			<VisualizationArea
				{...props}
				title="Quick Sort"
				sorter={
					new QuickSort((a, b) => {
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

export default QuickSortVisualizer;
