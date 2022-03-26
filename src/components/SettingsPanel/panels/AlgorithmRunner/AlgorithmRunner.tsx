import React, { useContext } from 'react';
import SettingsContext from 'model/SettingsContext';
import useAlgorithmRunner from './useAlgorithmRunner';
import './AlgorithmRunner.scss';

const AlgorithmRunner = () => {
	const { settings } = useContext(SettingsContext);
	const nodeMultipliers = [1, 100, 1000];
	const dependencyArr = [settings.nodeCount, settings.algorithmOption.title];

	const { runTimes, runningAlgorithms, onRunAlgorithm } = useAlgorithmRunner({
		settings,
		nodeMultipliers,
		dependencyArr,
	});

	const getCellText = (algorithmRunning: boolean, runTime: number | undefined) => {
		if (algorithmRunning) return '...'; // maybe should be an animated loading icon
		if (typeof runTime === 'number') return runTime.toPrecision(3) + ' sec';
		return '?';
	};

	return (
		<div className="algorithm-runner">
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
							{nodeMultipliers.map((mult, idx) => (
								<td key={idx} className="node-count">
									{settings.nodeCount * mult}
								</td>
							))}
						</tr>
					</thead>
					<tbody>
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
