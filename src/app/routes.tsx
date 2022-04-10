import MergeSortVisualizer from 'components/Visualizers/MergeSortVisualizer/MergeSortVisualizer';
import BubbleSortVisualizer from 'components/Visualizers/BubbleSortVisualizer/BubbleSortVisualizer';
import QuickSortVisualizer from 'components/Visualizers/QuickSortVisualizer/QuickSortVisualizer';
import { VisualizationAreaComponentProps } from 'components/Visualizers/VisualizationArea/VisualizationArea';

interface RouteProps {
	path: string;
	title: string;
	Visualizer?: (args: VisualizationAreaComponentProps) => JSX.Element;
}

const routes: RouteProps[] = [
	{
		path: '/mergeSort',
		title: 'Merge Sort',
		Visualizer: MergeSortVisualizer,
	},
	{
		path: '/bubbleSort',
		title: 'Bubble Sort',
		Visualizer: BubbleSortVisualizer,
	},
	{
		path: '/quickSort',
		title: 'Quick Sort',
		Visualizer: QuickSortVisualizer,
	},
];

export default routes;
export type { RouteProps };
