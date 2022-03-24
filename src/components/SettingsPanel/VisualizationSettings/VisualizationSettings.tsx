import React, { useContext } from 'react';
import { SortSpeed, sortSpeedString } from 'utils/Enums';
import clsx from 'clsx';
import Dropdown from 'components/Inputs/Dropdown';
import InputField from 'components/Inputs/InputField';
import SettingsContext from 'model/SettingsContext';
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
					type="number"
					value={settings.nodeCount}
					onChange={v => updateSettings({ nodeCount: Number(v) })}
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
				colorString={settings.selectedColors.primaryColor}
				onColorChange={v => updateSettings({ selectedColors: { primaryColor: v } })}
				optionLabel="Primary color"
				buttonClassName="primary"
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
