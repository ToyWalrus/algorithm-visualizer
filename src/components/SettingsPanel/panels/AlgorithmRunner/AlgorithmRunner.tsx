import React, { useContext } from 'react';
import SettingsContext from 'model/SettingsContext';
import useAlgorithmRunner from './useAlgorithmRunner';
import './AlgorithmRunner.scss';

const AlgorithmRunner = () => {
	const { settings } = useContext(SettingsContext);
	const nodeMultipliers = [1, 100, 1000];
	const dependencyArr = [settings.nodeCount, settings.algorithmOption.title];

	const { runTimes, runningAlgorithms, onRunAlgorithm, currentAlgorithmTitle } = useAlgorithmRunner({
		settings,
		nodeMultipliers,
		dependencyArr,
	});

	const getCellText = (algorithmRunning: boolean, runTime: number | undefined) => {
		if (algorithmRunning) return '...'; // maybe should be an animated loading icon
		if (typeof runTime === 'number') {
			let str = ' sec';
			let val: string;
			if (runTime > 1) {
				val = runTime.toPrecision(3);
			} else if (runTime > 0.01) {
				val = runTime.toFixed(3);
			} else {
				val = runTime.toFixed(4);
			}
			return val + str;
		}
		return '?';
	};

	return (
		<div className="algorithm-runner">
			<div className="disclaimer">
				Note that even on the fastest setting here, computers are able to make thousands of calculations per
				second. In order to get an idea of the actual speed of the
				<span className="text-highlight">&nbsp;{settings.algorithmOption.title.toLowerCase()}&nbsp;</span>
				algorithm (with various node counts), press this button.
			</div>
			<div className="run-algorithm-section">
				<button
					className="run-algorithm-button"
					onClick={onRunAlgorithm}
					disabled={runningAlgorithms.some(v => v)}
				>
					Run algorithm
				</button>
				<table className="algorithm-result-table">
					<thead>
						<tr>
							<td className="algorithm-title text-highlight" colSpan={nodeMultipliers.length + 1}>
								{currentAlgorithmTitle.toUpperCase()}
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="row-head">Nodes</td>
							{nodeMultipliers.map((mult, idx) => (
								<td key={idx} className="node-count">
									{settings.nodeCount * mult}
								</td>
							))}
						</tr>
						<tr>
							<td className="row-head">Time</td>
							{runTimes.map((runTime, idx) => (
								<td key={idx} className="algorithm-result">
									{getCellText(runningAlgorithms[idx], runTime)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AlgorithmRunner;
