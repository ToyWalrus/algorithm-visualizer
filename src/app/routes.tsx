import MergeSortVisualizer from 'components/Visualizers/MergeSortVisualizer/MergeSortVisualizer';
import {
	BubbleChart as BubbleSortIcon,
	LowPriority as QuickSortIcon,
	MenuOpen as MergeSortIcon,
} from '@material-ui/icons';
import BubbleSortVisualizer from 'components/Visualizers/BubbleSortVisualizer/BubbleSortVisualizer';
import QuickSortVisualizer from 'components/Visualizers/QuickSortVisualizer/QuickSortVisualizer';

interface RouteProps {
	path: string;
	title: string;
	icon?: JSX.Element;
	Visualizer?: (args: any) => JSX.Element;
}

const routes: RouteProps[] = [
	{
		path: '/mergeSort',
		title: 'Merge Sort',
		Visualizer: MergeSortVisualizer,
		icon: <MergeSortIcon className="merge-sort-icon" />,
	},
	{
		path: '/bubbleSort',
		title: 'Bubble Sort',
		Visualizer: BubbleSortVisualizer,
		icon: <BubbleSortIcon />,
	},
	{
		path: '/quickSort',
		title: 'Quick Sort',
		Visualizer: QuickSortVisualizer,
		icon: <QuickSortIcon />,
	},
];

export default routes;
export type { RouteProps };
