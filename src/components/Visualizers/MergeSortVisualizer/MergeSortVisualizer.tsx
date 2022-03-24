import React from 'react';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';
import MergeSort from 'algorithms/MergeSort';

const MergeSortVisualizer = ({ items, sortStepDelay }: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			<VisualizationArea
				items={items}
				title="Merge Sort"
				sortStepDelay={sortStepDelay}
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
