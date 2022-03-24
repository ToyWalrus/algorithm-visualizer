import React from 'react';
import { SortSpeed, sortSpeedString } from '../../../utils/Enums';
import clsx from 'clsx';
import Dropdown from '../../Inputs/Dropdown';
import InputField from '../../Inputs/InputField';
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

const dropdownOptions = Object.values(SortSpeed)
	.filter(v => typeof v !== 'string')
	.map(spd => ({ value: spd, label: sortSpeedString(spd as SortSpeed) }));

const VisualizationSettings = (props: VisualizationSettingsProps) => {
	return (
		<div className="visualization-settings">
			<OptionRow optionLabel="Number of nodes">
				<InputField
					type="number"
					value={props.nodeCount}
					onChange={v => props.onNodeCountChange(v as number)}
				/>
			</OptionRow>
			<OptionRow optionLabel="Visual sort speed">
				<Dropdown
					value={sortSpeedString(props.sortSpeed)}
					valueEquator={(a, b) => sortSpeedString(a) === b}
					options={dropdownOptions}
					onChange={props.onSortSpeedChange}
					className="visual-sort-speed-dropdown"
				/>
			</OptionRow>
			<ColorOptionRow
				colorString={props.primaryColor}
				onColorChange={props.onPrimaryColorChange}
				optionLabel="Primary color"
				buttonClassName="primary"
			/>
			<ColorOptionRow
				colorString={props.alternateColor}
				onColorChange={props.onAlternateColorChange}
				optionLabel="Alternate color"
				buttonClassName="alternate"
			/>
		</div>
	);
};

interface OptionRowProps {
	optionLabel: string;
}

const OptionRow = ({ children, optionLabel }: React.PropsWithChildren<OptionRowProps>) => {
	return (
		<div className="visualization-option-row">
			<span className="option-input">{children}</span>
			<span className="option-label">{optionLabel}</span>
		</div>
	);
};

interface ColorOptionRowProps extends OptionRowProps {
	colorString: string;
	onColorChange: (newColorString: string) => void;
	buttonClassName?: string;
}

const ColorOptionRow = ({ optionLabel, colorString, onColorChange, buttonClassName }: ColorOptionRowProps) => {
	// TODO: add color picker
	return (
		<div className="visualization-color-option-row">
			<button
				className={clsx('color-button', buttonClassName)}
				style={{ backgroundColor: `#${colorString}` }}
				onClick={e => onColorChange(colorString)}
			/>
			<span className="option-label">{optionLabel}</span>
		</div>
	);
};

export default VisualizationSettings;
