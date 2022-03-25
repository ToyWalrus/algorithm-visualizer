import React, { useState, useRef, CSSProperties } from 'react';
import { BlockPicker, ColorResult } from 'react-color';
import { Classes } from 'reactcss';
import clsx from 'clsx';
import ElevatedContainer from 'components/ElevatedContainer/ElevatedContainer';
import { colorOptions } from 'model/SettingsContext';

interface ColorOptionRowProps {
	colorString: string;
	onColorChange: (newColorString: string) => void;
	pickerHeight?: number;
	isPrimary?: boolean;
}

const ColorOptionRow = ({ colorString, pickerHeight, onColorChange, isPrimary: primary }: ColorOptionRowProps) => {
	const [pickerIsOpen, setPickerOpen] = useState(false);
	const [originalColor, setOriginalColor] = useState(colorString);
	const ref = useRef<HTMLButtonElement>(null);

	const updateSettingsColor = (c: ColorResult) => {
		if (!pickerIsOpen) return; // the mouse can trigger a hover event when the picker exits
		const newColor = c.hex.substring(1); // the hex string starts with # which we don't want to keep
		onColorChange(newColor);
	};

	return (
		<div className="visualization-color-option-row">
			<ElevatedContainer
				className="picker-container"
				anchorEl={ref}
				margin={15}
				side={primary ? 'top' : 'bottom'}
				open={pickerIsOpen}
				onClose={() => {
					onColorChange(originalColor);
					setPickerOpen(false);
				}}
			>
				<BlockPicker
					color={colorString}
					colors={colorOptions.map(c => `#${c}`)}
					styles={primary ? getStylesForPrimaryRow(pickerHeight) : getStylesForAlternateRow(pickerHeight)}
					onSwatchHover={updateSettingsColor}
					onChange={c => {
						updateSettingsColor(c);
						setPickerOpen(false);
					}}
				/>
			</ElevatedContainer>
			<button
				ref={ref}
				className={clsx('color-button', { primary, alternate: !primary })}
				style={{ backgroundColor: `#${colorString}` }}
				onClick={() => {
					setOriginalColor(colorString);
					setPickerOpen(true);
				}}
			/>
			<span className="option-label">{primary ? 'Primary' : 'Alternate'}&nbsp;color</span>
		</div>
	);
};

// This is a pretty crude way of handling the picker styling but it's what the library
// provides and I don't want to go through the trouble of making a custom one when
// the BlockPicker works just fine.

interface BlockPickerStyleProps {
	card: CSSProperties;
	head: CSSProperties;
	body: CSSProperties;
	label: CSSProperties;
	triangle: CSSProperties;
	input: CSSProperties;
}

const borderRadius = 5;
const commonStyles = {
	input: { display: 'none' },
	triangle: { left: '10%' },
	body: { paddingBottom: 0 },
};

const getStylesForAlternateRow = (size?: number): Partial<Classes<BlockPickerStyleProps>> => {
	return {
		default: {
			...commonStyles,
			card: {
				height: size,
			},
		},
	};
};

const getStylesForPrimaryRow = (size?: number): Partial<Classes<BlockPickerStyleProps>> => {
	return {
		default: {
			...commonStyles,
			triangle: {
				...commonStyles.triangle,
				transform: 'rotateZ(180deg)',
				top: size || 150,
			},
			card: {
				height: size,
				display: 'flex',
				flexDirection: 'column-reverse',
				borderRadius,
			},
			head: {
				borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
			},
		},
	};
};

export default ColorOptionRow;
