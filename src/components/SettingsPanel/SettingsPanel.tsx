import React from 'react';
import clsx from 'clsx';
import AlgorithmRunner from './panels/AlgorithmRunner/AlgorithmRunner';
import './SettingsPanel.scss';

interface SettingsPanelProps {
	sections: PanelSectionProps[];
	isOpen?: boolean;
}

const SettingsPanel = ({ isOpen = true, sections }: SettingsPanelProps) => {
	return (
		<div className={clsx('settings-panel', { open: isOpen })}>
			{sections.map((sec, i) => (
				<PanelSection {...sec} hasVisualBreak={sec.hasVisualBreak || i !== sections.length - 1} key={i} />
			))}
			<div className="spacer" />
			<PanelSection className="disclaimer">
				<AlgorithmRunner />
			</PanelSection>
		</div>
	);
};

export interface PanelSectionProps {
	title?: string;
	className?: string;
	hasVisualBreak?: boolean;
}

const PanelSection = ({ children, title, className, hasVisualBreak }: React.PropsWithChildren<PanelSectionProps>) => {
	return (
		<section className={clsx('panel-section', className)}>
			{title && <h2 className="section-title">{title}</h2>}
			{children}
			{hasVisualBreak && <hr />}
		</section>
	);
};

export default SettingsPanel;
