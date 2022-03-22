import React from 'react';
import clsx from 'clsx';
import './SettingsPanel.scss';

interface SettingsPanelProps {
	sections: PanelSectionProps[];
	isOpen?: boolean;
}

const SettingsPanel = ({ isOpen = true, sections }: SettingsPanelProps) => {
	return (
		<div className={clsx('settings-panel', { open: isOpen })}>
			{sections.map((sec, i) => (
				<PanelSection {...sec} hasVisualBreak={i !== sections.length - 1} key={i} />
			))}
		</div>
	);
};

export interface PanelSectionProps {
	title?: string;
	className?: string;
	hasVisualBreak?: boolean;
	content: JSX.Element | JSX.Element[];
}

const PanelSection = ({ content, title, className, hasVisualBreak }: PanelSectionProps) => {
	return (
		<section className={clsx('panel-section', className)}>
			{title && <h2 className="section-title">{title}</h2>}
			{content}
			{hasVisualBreak && <hr />}
		</section>
	);
};

export default SettingsPanel;
