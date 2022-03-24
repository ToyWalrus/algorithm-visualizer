import BubbleSort from '../algorithms/BubbleSort';
import MergeSort from '../algorithms/MergeSort';
import QuickSort from '../algorithms/QuickSort';
import SortAlgorithm from '../algorithms/SortAlgorithm';
import Node from './Node';

export interface AlgorithmOption {
	title: string;
	algorithm: SortAlgorithm;
	description?: string;
	complexity?: string | JSX.Element;
	uses?: string;
}

const comparator = (a: Node, b: Node) => {
	let v1 = a.value as number;
	let v2 = b.value as number;
	if (v1 < v2) return -1;
	if (v1 > v2) return 1;
	return 0;
};

const loremIpsum =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

const allAlgorithms: AlgorithmOption[] = [
	{
		title: 'Merge sort',
		algorithm: new MergeSort(comparator),
		description: loremIpsum,
	},
	{
		title: 'Bubble sort',
		algorithm: new BubbleSort(comparator),
		description: loremIpsum,
	},
	{
		title: 'Quick sort',
		algorithm: new QuickSort(comparator),
		description: loremIpsum,
	},
];

export default allAlgorithms;
