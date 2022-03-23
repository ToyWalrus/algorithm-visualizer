import React from 'react';
import { SortSpeed } from '../../../model/Settings';
import './VisualizationSettings.scss';

interface VisualizationSettingsProps {
	nodeCount: number;
	sortSpeed: SortSpeed;
	primaryColor: string;
	alternateColor: string;

	onNodeCountChange: (newCount: number) => void;
	onSortSpeedChange: (newSpeed: SortSpeed) => void;
	onPrimaryColorChange: (newColor: string) => void;
	onAlternateColorChange: (newColor: string) => void;
}

const VisualizationSettings = (props: VisualizationSettingsProps) => {};

export default VisualizationSettings;
