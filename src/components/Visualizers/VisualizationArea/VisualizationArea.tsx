import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import DataBar, { DataBarProps } from 'components/DataBar/DataBar';
import SortAlgorithm from 'algorithms/SortAlgorithm';
import Node from 'model/Node';
import shuffle from 'shuffle-array';
import { sortSpeedValue } from 'utils/Enums';
import { AlgorithmSettings } from 'model/SettingsContext';
import clsx from 'clsx';
import TitleRow from './TitleRow';
import AlgorithmControls from './AlgorithmControls';
import './VisualizationArea.scss';

export interface VisualizationAreaComponentProps {
	settings: AlgorithmSettings;
	isSettingsPanelOpen: boolean;
}

interface VisualizationAreaProps extends VisualizationAreaComponentProps {
	sorter: SortAlgorithm;
	title: string;
}

const VisualizationArea = (props: VisualizationAreaProps) => {
	const {
		onResetClick,
		items,
		onSortStepClick,
		canStart,
		isFinished,
		sortStep,
		onStartClick,
		onStopClick,
		isSorting,
	} = useVisualizationAreaHook(props);

	return (
		<div className={clsx('visualization-area', { 'settings-open': props.isSettingsPanelOpen })}>
			<TitleRow title={props.title} hasFinishedSorting={isFinished} sortStep={sortStep} />
			<AlgorithmControls
				hasStartedSorting={isSorting}
				hasFinishedSorting={isFinished}
				canStartSorting={canStart}
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
	const nodeRecreationDependencies = [
		settings.nodeCount,
		settings.selectedColors.primaryColor,
		settings.selectedColors.alternateColor,
	];

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

	const timer = useRef<NodeJS.Timeout | undefined>(undefined);
	const items = useMemo(createNodes, nodeRecreationDependencies);
	const [sortStep, setSortStep] = useState(0);
	const [canStart, setCanStart] = useState(false);
	const [isSorting, setIsSorting] = useState(false);
	const [isFinished, setIsFinished] = useState(true);
	const [sortIterator, setSortIterator] = useState(sorter.sort(items));

	const unsetNodesBeingSorted = () => {
		items.forEach(node => {
			node.isBeingSorted = false;
		});
	};

	const onSortStepClick = (): boolean => {
		if (sortIterator && !sortIterator.next().done) {
			setSortStep(prev => prev + 1);
			return true;
		} else {
			onStopClick();
			unsetNodesBeingSorted();
			setIsFinished(true);
			setCanStart(false);
			return false;
		}
	};

	const onStopClick = () => {
		if (timer.current) {
			clearTimeout(timer.current);
			timer.current = undefined;
		}
		setIsSorting(false);
	};

	const onStartClick = () => {
		const stepFunction = () =>
			setTimeout(() => {
				if (onSortStepClick()) {
					timer.current = stepFunction();
				}
			}, sortSpeedValue(settings.sortSpeed) || 200);

		onStopClick();
		setIsSorting(true);
		timer.current = stepFunction();
	};

	const onResetClick = () => {
		onStopClick();
		shuffle(items);
		items.forEach(node => {
			node.isBeingSorted = false;
		});

		setSortStep(0);
		setIsFinished(false);
		setCanStart(true);
		setSortIterator(sorter.sort(items));
	};

	useEffect(() => {
		if (timer.current) {
			onStartClick();
		}
	}, [settings.sortSpeed]);

	useEffect(() => {
		setCanStart(false);
	}, nodeRecreationDependencies);

	return {
		items,
		sortStep,
		canStart,
		isSorting,
		isFinished,
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
