import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { AnimateSharedLayout } from 'framer-motion';
import shuffle from 'shuffle-array';
import DataBar, { DataBarProps } from 'components/DataBar/DataBar';
import SortAlgorithm from 'algorithms/SortAlgorithm';
import useForceUpdate from 'utils/useForceUpdate';
import Node from 'model/Node';
import './VisualizationArea.css';
import { SortSpeed, sortSpeedValue } from 'utils/Enums';
import { AlgorithmSettings } from 'model/SettingsContext';

export interface VisualizationAreaComponentProps {
	activeSettings: AlgorithmSettings;
}

interface VisualizationAreaProps extends VisualizationAreaComponentProps {
	sorter: SortAlgorithm;
	title?: string;
}

let timer: NodeJS.Timeout | undefined;

const VisualizationArea = ({ title, ...props }: VisualizationAreaProps) => {
	const { onResetClick, items, onSortStepClick, onStartClick, onStopClick } = useVisualizationAreaHook(props);

	return (
		<div className="visualization-area">
			<div className="control-buttons">
				<Button variant="contained" onClick={onStartClick}>
					Start
				</Button>
				<Button variant="contained" onClick={onStopClick}>
					Stop
				</Button>
				<Button variant="contained" onClick={onResetClick}>
					Shuffle/Reset
				</Button>
				<Button variant="contained" onClick={onSortStepClick}>
					Sort Step
				</Button>
			</div>
			{title && (
				<Typography className="title" color="primary" variant="h1">
					{title}
				</Typography>
			)}
			<AnimateSharedLayout>
				<div className="data-bars">
					{items.map((node, idx) => (
						<DataBar
							{...getDataBarProps(node, props.activeSettings.nodeCount)}
							key={'db_' + node.id + '_' + idx.toString()}
						/>
					))}
				</div>
			</AnimateSharedLayout>
		</div>
	);
};

const useVisualizationAreaHook = ({ activeSettings, sorter }: VisualizationAreaProps) => {
	const createNodes = () => {
		const items: Node[] = [];
		for (let i = 1; i <= activeSettings.nodeCount; ++i) {
			items.push(
				new Node({
					id: i.toString(),
					value: i,
					index: i - 1,
					primaryColor: activeSettings.selectedColors.primaryColor,
					alternateColor: activeSettings.selectedColors.alternateColor,
				})
			);
		}
		return items;
	};

	const items = useMemo(createNodes, [
		activeSettings.nodeCount,
		activeSettings.selectedColors.primaryColor,
		activeSettings.selectedColors.alternateColor,
	]);

	const [sortIterator, setSortIterator] = useState(sorter.sort(items));
	const forceUpdate = useForceUpdate();

	const onSortStepClick = (): boolean => {
		if (sortIterator && !sortIterator.next().done) {
			forceUpdate();
			return true;
		} else {
			onStopClick();
			return false;
		}
	};

	const onStopClick = () => {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
	};

	const onStartClick = () => {
		const stepFunction = () => {
			return setTimeout(() => {
				if (onSortStepClick()) {
					timer = stepFunction();
				} else {
					items.forEach(node => {
						node.isBeingSorted = false;
					});
					forceUpdate();
				}
			}, sortSpeedValue(activeSettings.sortSpeed) || 200);
		};

		onStopClick();
		timer = stepFunction();
	};

	const onResetClick = () => {
		onStopClick();
		shuffle(items);
		items.forEach(node => {
			node.isBeingSorted = false;
		});
		setSortIterator(sorter.sort(items));
	};

	useEffect(() => {
		if (timer) {
			onStartClick();
		}
	}, [activeSettings.sortSpeed]);

	return {
		items,
		onStartClick,
		onStopClick,
		onResetClick,
		onSortStepClick,
	};
};

const getDataBarProps = (node: Node, highestVal: number): DataBarProps => {
	return {
		value: Number(node.value) / highestVal,
		uniqueId: `db_${node.id}`,
		color: node.color,
		index: node.index,
	};
};

export default VisualizationArea;
export type { VisualizationAreaProps };
