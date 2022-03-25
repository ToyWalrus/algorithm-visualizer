import React from 'react';
import { SortSpeed } from 'utils/Enums';
import allAlgorithms, { AlgorithmOption } from './Algorithms';

// https://www.figma.com/file/jiEIMLcab13bjbBR5dtGQ0/Algorithm-Visualizer?node-id=0%3A1

export interface NodeColor {
	primaryColor: string;
	alternateColor?: string;
}

export interface AlgorithmSettings {
	sortSpeed: SortSpeed;
	nodeCount: number;
	algorithmOption: AlgorithmOption;
	selectedColors: NodeColor;
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
});

export const colorOptions = Object.freeze(['f2cf63', '9340cf', 'f15bb5', '00bbf9', '00f5d4']);

export default React.createContext({
	settings: defaultSettings,
	updateSettings: (_: Partial<AlgorithmSettings>) => {},
});
