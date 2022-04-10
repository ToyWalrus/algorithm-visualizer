import React, { useContext, useRef, useState } from 'react';
import { SortSpeed, sortSpeedString } from 'utils/Enums';
import clsx from 'clsx';
import Dropdown from 'components/Inputs/Dropdown';
import InputField from 'components/Inputs/InputField';
import SettingsContext from 'model/SettingsContext';
import ColorOptionRow from './ColorOptionRow';
import './VisualizationSettings.scss';

const dropdownOptions = Object.values(SortSpeed)
	.filter(v => typeof v !== 'string')
	.map(spd => ({ value: spd, label: sortSpeedString(spd as SortSpeed) }));

const VisualizationSettings = () => {
	const { settings, updateSettings } = useContext(SettingsContext);

	return (
		<div className="visualization-settings">
			<OptionRow optionLabel="Number of nodes">
				<InputField
					min={5}
					max={100}
					type="number"
					value={settings.nodeCount}
					onSubmit={v => updateSettings({ nodeCount: Number(v) })}
				/>
			</OptionRow>
			<OptionRow optionLabel="Visual sort speed">
				<Dropdown
					options={dropdownOptions}
					value={sortSpeedString(settings.sortSpeed)}
					valueEquator={(a, b) => sortSpeedString(a) === b}
					onChange={v => updateSettings({ sortSpeed: v })}
					className="visual-sort-speed-dropdown"
				/>
			</OptionRow>
			<ColorOptionRow
				isPrimary
				colorString={settings.selectedColors.primaryColor}
				onColorChange={v => updateSettings({ selectedColors: { primaryColor: v } })}
			/>
			<ColorOptionRow
				colorString={settings.selectedColors.alternateColor || settings.selectedColors.primaryColor}
				onColorChange={v =>
					updateSettings({
						selectedColors: {
							primaryColor: settings.selectedColors.primaryColor,
							alternateColor: v,
						},
					})
				}
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

export default VisualizationSettings;
