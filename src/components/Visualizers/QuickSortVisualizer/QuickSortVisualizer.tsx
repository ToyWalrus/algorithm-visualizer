import React from 'react';
import QuickSort from '../../../algorithms/QuickSort';
import Node from '../../../model/Node';
import VisualizationArea from '../VisualizationArea/VisualizationArea';

interface QuickSortVisualizerArgs {
	items: Node[];
	sortStepDelay?: number;
}

const QuickSortVisualizer = ({ items, sortStepDelay }: QuickSortVisualizerArgs) => {
	return (
		<div className="sort-visualizer">
			{/* Display the pivot number as well as bar values */}
			<VisualizationArea
				title="Quick Sort"
				items={items}
				sortStepDelay={sortStepDelay}
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
export type { QuickSortVisualizerArgs };
