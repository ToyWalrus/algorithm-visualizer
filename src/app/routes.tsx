import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';
import {
  MenuOpen as MergeSortIcon,
  BubbleChart as BubbleSortIcon,
  LowPriority as QuickSortIcon,
} from '@material-ui/icons';
import BubbleSortVisualizer from '../components/BubbleSortVisualizer/BubbleSortVisualizer';
import QuickSortVisualizer from '../components/QuickSortVisualizer/QuickSortVisualizer';

interface RouteArgs {
  path: string;
  title: string;
  icon?: JSX.Element;
  Visualizer?: (args: any) => JSX.Element;
}

const routes: RouteArgs[] = [
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
export type { RouteArgs };
