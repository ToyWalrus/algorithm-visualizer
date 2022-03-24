import React, { useContext } from 'react';
import clsx from 'clsx';
import SettingsContext from 'model/SettingsContext';
import './AlgorithmInfo.scss';

const AlgorithmInfo = () => {
	const { settings } = useContext(SettingsContext);
	const selectedAlgorithm = settings.algorithmOption;

	return (
		<div className="algorithm-info">
			<InfoSection text={selectedAlgorithm.description} className="description" />
			<InfoSection text={selectedAlgorithm.complexity} className="complexity" prependElement="Complexity: " />
			{selectedAlgorithm.uses && <InfoSection text={selectedAlgorithm.uses} className="uses" />}
		</div>
	);
};

interface InfoSectionProps {
	text?: string | JSX.Element;
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
