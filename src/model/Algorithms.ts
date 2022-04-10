import BubbleSort from 'algorithms/BubbleSort';
import MergeSort from 'algorithms/MergeSort';
import QuickSort from 'algorithms/QuickSort';
import SortAlgorithm, { CompareFunc } from 'algorithms/SortAlgorithm';
import { MergeSortDescriptors, BubbleSortDescriptors, QuickSortDescriptors } from './AlgorithmDescriptions';
import Node from './Node';

export interface AlgorithmOption {
	title: string;
	algorithm: SortAlgorithm;
	description: JSX.Element;
	complexity: JSX.Element;
	extraInfo: JSX.Element;
}

const comparator: CompareFunc = (a: Node, b: Node) => {
	let v1 = a.value as number;
	let v2 = b.value as number;
	if (v1 < v2) return -1;
	if (v1 > v2) return 1;
	return 0;
};

const allAlgorithms: AlgorithmOption[] = [
	{
		title: 'Merge sort',
		algorithm: new MergeSort(comparator),
		...MergeSortDescriptors,
	},
	{
		title: 'Bubble sort',
		algorithm: new BubbleSort(comparator),
		...BubbleSortDescriptors,
	},
	{
		title: 'Quick sort',
		algorithm: new QuickSort(comparator),
		...QuickSortDescriptors,
	},
];

export default allAlgorithms;
