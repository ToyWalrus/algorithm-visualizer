import React from 'react';
import clsx from 'clsx';
import './AlgorithmInfo.scss';

interface AlgorithmInfoProps {
	description: string | JSX.Element;
	complexity: string | JSX.Element;
	uses?: string | JSX.Element;
}

const AlgorithmInfo = (props: AlgorithmInfoProps) => {
	return (
		<div className="algorithm-info">
			<InfoSection text={props.description} className="description" />
			<InfoSection text={props.complexity} className="complexity" prependElement="Complexity: " />
			{props.uses && <InfoSection text={props.uses} className="uses" />}
		</div>
	);
};

interface InfoSectionProps {
	text: string | JSX.Element;
	prependElement?: string | JSX.Element;
	className?: string;
}

const InfoSection = ({ text, className, prependElement }: InfoSectionProps) => {
	return (
		<div className={clsx('info-section', className)}>
			<InfoIcon />
			<div className="info-text">
				{prependElement}
				{text}
			</div>
		</div>
	);
};

const InfoIcon = () => (
	<>
		<div className="info-icon-backdrop" />
		<i className="info-icon fa fa-info fa-lg" />
	</>
);

export default AlgorithmInfo;
