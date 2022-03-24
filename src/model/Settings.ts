import React from 'react';
import { SortSpeed } from '../utils/Enums';
import SortAlgorithm from '../algorithms/SortAlgorithm';
import MergeSort from '../algorithms/MergeSort';
import BubbleSort from '../algorithms/BubbleSort';
import QuickSort from '../algorithms/QuickSort';

// https://www.figma.com/file/jiEIMLcab13bjbBR5dtGQ0/Algorithm-Visualizer?node-id=0%3A1

const comparator = (a, b) => {
	let v1 = a.value as number;
	let v2 = b.value as number;
	if (v1 < v2) return -1;
	if (v1 > v2) return 1;
	return 0;
};

export const allAlgorithms: AlgorithmOption[] = [
	{
		title: 'Merge sort',
		algorithm: new MergeSort(comparator),
	},
	{
		title: 'Bubble sort',
		algorithm: new BubbleSort(comparator),
	},
	{
		title: 'Quick sort',
		algorithm: new QuickSort(comparator),
	},
];

export interface NodeColor {
	primaryColor: string;
	alternateColor?: string;
}

export interface AlgorithmOption {
	title: string;
	algorithm: SortAlgorithm;
}

export interface AlgorithmSettings {
	sortSpeed: SortSpeed;
	nodeCount: number;
	algorithmOption: AlgorithmOption;
	selectedColors: NodeColor;
	colorOptions?: NodeColor[];
}

const defaultColors: NodeColor = {
	primaryColor: 'F2CF63',
	alternateColor: '9340CF',
};

export const defaultSettings: AlgorithmSettings = Object.freeze({
	nodeCount: 10,
	algorithmOption: allAlgorithms[1],
	sortSpeed: SortSpeed.normal,
	selectedColors: defaultColors,
	colorOptions: [defaultColors],
});

export default React.createContext({
	settings: defaultSettings,
	updateSettings: (_: Partial<AlgorithmSettings>) => {
	},
});