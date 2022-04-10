import React, { useContext } from 'react';
import clsx from 'clsx';
import SettingsContext from 'model/SettingsContext';
import './AlgorithmInfo.scss';

const AlgorithmInfo = () => {
	const { settings } = useContext(SettingsContext);
	const selectedAlgorithm = settings.algorithmOption;

	return (
		<div className="algorithm-info">
			<InfoSection className="description">{selectedAlgorithm.description}</InfoSection>
			<InfoSection>{selectedAlgorithm.extraInfo}</InfoSection>
			<InfoSection className="complexity">{selectedAlgorithm.complexity}</InfoSection>
		</div>
	);
};

interface InfoSectionProps {
	className?: string;
}

const InfoSection = ({ children, className }: React.PropsWithChildren<InfoSectionProps>) => {
	return (
		<div className={clsx('info-section', className)}>
			<InfoIcon />
			<div className="info-text">{children}</div>
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
