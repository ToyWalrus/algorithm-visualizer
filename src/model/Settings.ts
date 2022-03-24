import React from 'react';
import { SortSpeed } from '../utils/Enums';

// https://www.figma.com/file/jiEIMLcab13bjbBR5dtGQ0/Algorithm-Visualizer?node-id=0%3A1

export interface NodeColor {
	defaultColor: string;
	sortingColor?: string;
}

interface AlgorithmSettings {
	sortSpeed: SortSpeed;
	nodeCount: number;
	colors?: NodeColor[];
}

const settings: AlgorithmSettings = {
	sortSpeed: SortSpeed.normal,
	nodeCount: 10,
};

export default React.createContext({
	settings,
	updateSettings: ({ sortSpeed, nodeCount, colors }: Partial<AlgorithmSettings>) => {
		if (sortSpeed) {
			settings.sortSpeed = sortSpeed;
		}
		if (nodeCount) {
			settings.nodeCount = nodeCount;
		}
		if (colors) {
			settings.colors = colors;
		}
	},
});
