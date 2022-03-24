import React, { useContext } from 'react';
import clsx from 'clsx';
import SettingsContext from 'model/SettingsContext';
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
			<DisclaimerSection />
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

const DisclaimerSection = () => {
	const { settings } = useContext(SettingsContext);

	return (
		<section className="panel-section disclaimer">
			<div>
				Note that even on the fastest setting here, computers are able to make thousands of calculations per
				second. In order to get an idea of the actual speed of sorting a list of
				<span className="text-highlight">&nbsp;{settings.nodeCount}&nbsp;</span>
				nodes with the
				<span className="text-highlight">&nbsp;{settings.algorithmOption.title.toLowerCase()}&nbsp;</span>
				algorithm, press this button.
			</div>
			<div className="run-algorithm-section">
				<button>Run algorithm</button>
				<span className="algorithm-result">0.023 sec</span>
			</div>
		</section>
	);
};

export default SettingsPanel;
