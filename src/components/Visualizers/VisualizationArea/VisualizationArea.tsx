import React, { useEffect, useMemo, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import DataBar, { DataBarProps } from 'components/DataBar/DataBar';
import SortAlgorithm from 'algorithms/SortAlgorithm';
import useForceUpdate from 'utils/useForceUpdate';
import Node from 'model/Node';
import shuffle from 'shuffle-array';
import { sortSpeedValue } from 'utils/Enums';
import { AlgorithmSettings } from 'model/SettingsContext';
import clsx from 'clsx';
import TitleRow from './TitleRow';
import './VisualizationArea.scss';
import AlgorithmControls from './AlgorithmControls';

export interface VisualizationAreaComponentProps {
	settings: AlgorithmSettings;
	isSettingsPanelOpen: boolean;
}

interface VisualizationAreaProps extends VisualizationAreaComponentProps {
	sorter: SortAlgorithm;
	title: string;
}

let timer: NodeJS.Timeout | undefined;

const VisualizationArea = (props: VisualizationAreaProps) => {
	const { onResetClick, items, onSortStepClick, onStartClick, onStopClick, isSorting } =
		useVisualizationAreaHook(props);

	return (
		<div className={clsx('visualization-area', { 'settings-open': props.isSettingsPanelOpen })}>
			<TitleRow title={props.title} hasFinishedSorting={false} hasStartedSorting={isSorting} sortStep={0} />
			<AlgorithmControls
				hasStartedSorting={isSorting}
				onSortStep={onSortStepClick}
				onShuffle={onResetClick}
				onStart={onStartClick}
				onStop={onStopClick}
			/>
			<div className="spacer" />
			<AnimateSharedLayout>
				<div className="data-bars">
					{items.map((node, idx) => (
						<DataBar
							{...getDataBarProps(node, props.settings.nodeCount)}
							key={'db_' + node.id + '_' + idx.toString()}
						/>
					))}
				</div>
			</AnimateSharedLayout>
		</div>
	);
};

const useVisualizationAreaHook = ({ settings, sorter }: VisualizationAreaProps) => {
	const createNodes = () => {
		const items: Node[] = [];
		for (let i = 1; i <= settings.nodeCount; ++i) {
			items.push(
				new Node({
					id: i.toString(),
					value: i,
					index: i - 1,
					primaryColor: settings.selectedColors.primaryColor,
					alternateColor: settings.selectedColors.alternateColor,
				})
			);
		}
		return items;
	};

	const items = useMemo(createNodes, [
		settings.nodeCount,
		settings.selectedColors.primaryColor,
		settings.selectedColors.alternateColor,
	]);

	const [isSorting, setIsSorting] = useState(false);
	const [sortIterator, setSortIterator] = useState(sorter.sort(items));
	const forceUpdate = useForceUpdate();

	const unsetNodesBeingSorted = () => {
		items.forEach(node => {
			node.isBeingSorted = false;
		});
	};

	const onSortStepClick = (): boolean => {
		if (sortIterator && !sortIterator.next().done) {
			forceUpdate();
			return true;
		} else {
			onStopClick();
			unsetNodesBeingSorted();
			forceUpdate();
			return false;
		}
	};

	const onStopClick = () => {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
		setIsSorting(false);
	};

	const onStartClick = () => {
		const stepFunction = () => {
			return setTimeout(() => {
				if (onSortStepClick()) {
					timer = stepFunction();
				}
			}, sortSpeedValue(settings.sortSpeed) || 200);
		};

		onStopClick();
		setIsSorting(true);
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
	}, [settings.sortSpeed]);

	return {
		items,
		isSorting,
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
