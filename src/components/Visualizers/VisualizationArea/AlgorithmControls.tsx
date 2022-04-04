import React from 'react';
import clsx from 'clsx';
import './AlgorithmControls.scss';

interface AlgorithmControlsProps {
	hasStartedSorting: boolean;

	onStart: VoidFunction;
	onStop: VoidFunction;
	onSortStep: VoidFunction;
	onShuffle: VoidFunction;
}

const AlgorithmControls = (props: AlgorithmControlsProps) => {
	return (
		<div className="algorithm-controls">
			<ControlButton icon="play" onClick={props.onStart} disabled={props.hasStartedSorting}>
				Start
			</ControlButton>
			<ControlButton icon="forward-step" onClick={props.onSortStep}>
				Step
			</ControlButton>
			<ControlButton icon="stop" onClick={props.onStop} disabled={!props.hasStartedSorting}>
				Stop
			</ControlButton>
			<ControlButton
				icon="shuffle"
				iconClass="rotated"
				onClick={props.onShuffle}
				disabled={props.hasStartedSorting}
			>
				Shuffle
			</ControlButton>
		</div>
	);
};

interface ControlButtonProps {
	onClick: VoidFunction;
	icon: string;
	iconClass?: string;
	disabled?: boolean;
}

const ControlButton = ({
	icon,
	iconClass,
	disabled,
	onClick,
	children,
}: React.PropsWithChildren<ControlButtonProps>) => {
	return (
		<button className="control-button" onClick={onClick} disabled={disabled}>
			<i className={clsx('control-button-icon', `fa fa-${icon} fa-xl`, iconClass)} />
			<span className="control-button-text">{children}</span>
		</button>
	);
};

export default AlgorithmControls;
