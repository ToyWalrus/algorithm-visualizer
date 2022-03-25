import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import SettingsContext, { AlgorithmSettings } from 'model/SettingsContext';
import './SettingsPanel.scss';
import shuffle from 'shuffle-array';
import Node from 'model/Node';

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

	const nodeCountMultiplier2 = 100;
	const nodeCountMultiplier3 = 1000;
	const [runTimeInSeconds1, setRunTimeInSeconds1] = useState<number | undefined>();
	const [runTimeInSeconds2, setRunTimeInSeconds2] = useState<number | undefined>();
	const [runTimeInSeconds3, setRunTimeInSeconds3] = useState<number | undefined>();
	const [algorithmIsRunning1, setAlgorithmIsRunning1] = useState(false);
	const [algorithmIsRunning2, setAlgorithmIsRunning2] = useState(false);
	const [algorithmIsRunning3, setAlgorithmIsRunning3] = useState(false);

	// Reset run time whenever applicable settings change
	useEffect(() => {
		setRunTimeInSeconds1(undefined);
		setRunTimeInSeconds2(undefined);
		setRunTimeInSeconds3(undefined);
	}, [settings.nodeCount, settings.algorithmOption.title]);

	const onRunAlgorithm = () => {
		setAlgorithmIsRunning1(true);
		setAlgorithmIsRunning2(true);
		setAlgorithmIsRunning3(true);

		runAlgorithm(settings, millisecondsPassed => {
			setRunTimeInSeconds1(millisecondsPassed / 1000);
			setAlgorithmIsRunning1(false);
		});

		runAlgorithm({ ...settings, nodeCount: settings.nodeCount * nodeCountMultiplier2 }, millisecondsPassed => {
			setRunTimeInSeconds2(millisecondsPassed / 1000);
			setAlgorithmIsRunning2(false);
		});

		runAlgorithm({ ...settings, nodeCount: settings.nodeCount * nodeCountMultiplier3 }, millisecondsPassed => {
			setRunTimeInSeconds3(millisecondsPassed / 1000);
			setAlgorithmIsRunning3(false);
		});
	};

	const getCellText = (algorithmRunning: boolean, runTime: number | undefined) => {
		if (algorithmRunning) return '...'; // maybe should be an animated loading icon
		if (typeof runTime === 'number') return runTime.toPrecision(3) + ' sec';
		return '?';
	};

	return (
		<section className="panel-section disclaimer">
			<div>
				Note that even on the fastest setting here, computers are able to make thousands of calculations per
				second. In order to get an idea of the actual speed of the
				<span className="text-highlight">&nbsp;{settings.algorithmOption.title.toLowerCase()}&nbsp;</span>
				algorithm (with various node counts), press this button.
			</div>
			<div className="run-algorithm-section">
				<button className="run-algorithm-button" onClick={onRunAlgorithm}>
					Run algorithm
				</button>
				<table className="algorithm-result-table">
					<thead>
						<tr>
							<td className="row-head">Nodes</td>
							<td className="node-count">{settings.nodeCount}</td>
							<td className="node-count">{settings.nodeCount * nodeCountMultiplier2}</td>
							<td className="node-count">{settings.nodeCount * nodeCountMultiplier3}</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="row-head">Time</td>
							<td className="algorithm-result">{getCellText(algorithmIsRunning1, runTimeInSeconds1)}</td>
							<td className="algorithm-result">{getCellText(algorithmIsRunning2, runTimeInSeconds2)}</td>
							<td className="algorithm-result">{getCellText(algorithmIsRunning3, runTimeInSeconds3)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
};

// To prevent killing the web page when node count is huge, break this functionality into a webworker
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
const runAlgorithm = (settings: AlgorithmSettings, cb: (val: number) => void) => {
	return new Promise<number>(resolve => {
		const sorter = settings.algorithmOption.algorithm;
		const vals: Node[] = [];
		for (let i = 0; i < settings.nodeCount; ++i) {
			vals.push(new Node({ value: i, index: i, id: i.toString(), primaryColor: '' }));
		}

		const shuffledList = shuffle(vals, { copy: true });

		const startTime = window.performance.now();
		const stepper = sorter.sort(shuffledList);
		while (!stepper.next().done);
		const endTime = window.performance.now();

		resolve(endTime - startTime);
	}).then(cb);
};

export default SettingsPanel;
