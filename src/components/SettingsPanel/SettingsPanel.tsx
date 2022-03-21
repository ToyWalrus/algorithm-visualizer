import React, { useEffect, useState } from 'react';
import { Container, Slider, Input, Typography, Grid, Divider } from '@material-ui/core';

interface SettingsPanelArgs {
	sortSpeed: number;
	onChangeSortSpeed: (speed: number) => void;
	// colors?
	elementCount: number;
	onChangeElementCount: (count: number) => void;
}

// Values in seconds
const minSpeed = 0.01;
const maxSpeed = 1;
const speedStepAmount = 0.01;
const minElements = 10;
const maxElements = 100;
const elementStepAmount = 1;

const SettingsPanel = (args: SettingsPanelArgs) => {
	let { sortSpeed, elementCount, onBlurSortSpeed, onBlurElementCount, onChangeElementCount, onChangeSortSpeed } =
		useSettingsPanelControls(args);

	return (
		<Container maxWidth="md">
			<Typography id="input-slider" gutterBottom>
				Sort speed
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item md>
					<Slider
						min={minSpeed}
						max={maxSpeed}
						step={speedStepAmount}
						style={{ minWidth: 100 }}
						color="secondary"
						value={sortSpeed}
						onChange={(_, newVal) => onChangeSortSpeed(newVal.toString())}
						onMouseUp={onBlurSortSpeed}
					/>
				</Grid>
				<Grid item xs>
					<Input
						value={sortSpeed}
						margin="dense"
						onChange={e => onChangeSortSpeed(e.target.value)}
						onBlur={onBlurSortSpeed}
						onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
						inputProps={{
							step: speedStepAmount,
							min: minSpeed,
							max: maxSpeed,
							type: 'number',
						}}
					/>
				</Grid>
			</Grid>
			<Divider />
			<Typography id="input-slider" gutterBottom>
				Number of elements
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item md>
					<Input
						value={elementCount}
						margin="dense"
						onChange={e => onChangeElementCount(e.target.value)}
						onBlur={onBlurElementCount}
						onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
						inputProps={{
							step: elementStepAmount,
							min: minElements,
							max: maxElements,
							type: 'number',
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

const useSettingsPanelControls = (args: SettingsPanelArgs) => {
	let [elementCount, setElementCount] = useState(args.elementCount);
	let [sortSpeed, setSortSpeed] = useState(args.sortSpeed / 1000);

	useEffect(() => {
		setSortSpeed(args.sortSpeed / 1000);
		setElementCount(args.elementCount);
	}, [args.sortSpeed, args.elementCount]);

	const onChangeSortSpeed = (newSpeed: string) => {
		if (!newSpeed) {
			return;
		}
		let parsedSpeed = Number.parseFloat(newSpeed);
		setSortSpeed(parsedSpeed);
	};

	const onChangeElementCount = (newCount: string) => {
		if (!newCount) {
			return;
		}
		let parsedCount = Number.parseFloat(newCount);
		setElementCount(parsedCount);
	};

	const onBlurSortSpeed = () => {
		args.onChangeSortSpeed(Math.min(Math.max(sortSpeed, minSpeed), maxSpeed) * 1000);
	};

	const onBlurElementCount = () => {
		args.onChangeElementCount(Math.min(Math.max(elementCount, minElements), maxElements));
	};

	return {
		elementCount,
		sortSpeed,
		onChangeSortSpeed,
		onBlurSortSpeed,
		onChangeElementCount,
		onBlurElementCount,
	};
};

export default SettingsPanel;
export type { SettingsPanelArgs };
