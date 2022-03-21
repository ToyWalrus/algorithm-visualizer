import Node from '../../../model/Node';
import BubbleSort from '../../../algorithms/BubbleSort';
import VisualizationArea from '../VisualizationArea/VisualizationArea';

interface BubbleSortVisualizerArgs {
	items: Node[];
	sortStepDelay?: number;
}

const BubbleSortVisualizer = ({ items, sortStepDelay }: BubbleSortVisualizerArgs) => {
	return (
		<div className="sort-visualizer">
			<VisualizationArea
				items={items}
				title="Bubble Sort"
				sortStepDelay={sortStepDelay}
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
export type { BubbleSortVisualizerArgs };
