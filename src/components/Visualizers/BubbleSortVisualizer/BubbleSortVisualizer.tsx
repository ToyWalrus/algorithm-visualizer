import React from 'react';
import BubbleSort from 'algorithms/BubbleSort';
import VisualizationArea, { VisualizationAreaComponentProps } from '../VisualizationArea/VisualizationArea';

const BubbleSortVisualizer = (props: VisualizationAreaComponentProps) => {
	return (
		<div className="sort-visualizer">
			<VisualizationArea
				{...props}
				title="Bubble Sort"
				sorter={
					new BubbleSort((a, b) => {
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

export default BubbleSortVisualizer;
