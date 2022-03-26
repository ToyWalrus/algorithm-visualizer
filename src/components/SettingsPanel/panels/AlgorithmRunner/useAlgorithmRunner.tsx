import React, { useEffect, useState } from 'react';
import { useWorker } from '@koale/useworker';
import { AlgorithmSettings } from 'model/SettingsContext';

interface UseAlgorithmRunnerProps {
	settings: AlgorithmSettings;
	nodeMultipliers: number[];
	dependencyArr: any[];
}

type RunTimeType = number | undefined;
type RunTimeUseState = [RunTimeType, React.Dispatch<React.SetStateAction<RunTimeType>>];
type RunningAlgorithmsUseState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type Worker = (args: RunAlgorithmProps) => Promise<number>;

const useAlgorithmRunner = ({ settings, nodeMultipliers, dependencyArr }: UseAlgorithmRunnerProps) => {
	const runTimes: RunTimeUseState[] = [];
	const runningAlgorithms: RunningAlgorithmsUseState[] = [];
	const workers: Worker[] = [];

	for (let i = 0; i < nodeMultipliers.length; ++i) {
		runTimes.push(useState<number | undefined>());
		runningAlgorithms.push(useState<boolean>(false));
		workers.push(useWorker(runAlgorithm)[0]);
	}

	const setAllTo = (arr: (RunTimeUseState | RunningAlgorithmsUseState)[], value: any) => {
		arr.forEach(el => {
			const setter = el[1];
			setter(value);
		});
	};

	// Reset run time whenever applicable settings change
	useEffect(() => {
		setAllTo(runTimes, undefined);
	}, dependencyArr);

	const onRunAlgorithm = () => {
		setAllTo(runningAlgorithms, true);

		for (let i = 0; i < nodeMultipliers.length; ++i) {
			const multiplier = nodeMultipliers[i];
			const worker = workers[i];
			const runtimeSetter = runTimes[i][1];
			const algorithmRunningSetter = runningAlgorithms[i][1];

			worker({
				// we have to stringify the function since this is being passed to another "thread"
				algorithmFunctionStrings: settings.algorithmOption.algorithm.sortFunctionToString(),
				comparatorFunctionStrings: settings.algorithmOption.algorithm.comparatorFunctionToString(),
				nodeCount: settings.nodeCount * multiplier,
			}).then(millisecondsPassed => {
				runtimeSetter(millisecondsPassed / 1000);
				algorithmRunningSetter(false);
			});
		}
	};

	return {
		runTimes: runTimes.map(v => v[0]),
		runningAlgorithms: runningAlgorithms.map(v => v[0]),
		onRunAlgorithm,
	};
};

interface RunAlgorithmProps {
	algorithmFunctionStrings: string[];
	comparatorFunctionStrings: string[];
	nodeCount: number;
}

// To prevent killing the web page when node count is huge, break this functionality into a webworker
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
const runAlgorithm = ({ algorithmFunctionStrings, comparatorFunctionStrings, nodeCount }: RunAlgorithmProps) => {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
	const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;
	console.log('a', JSON.stringify(algorithmFunctionStrings));

	const algorithm = new GeneratorFunction(...algorithmFunctionStrings);
	console.log('b', comparatorFunctionStrings);

	const comparator = new GeneratorFunction(...comparatorFunctionStrings);
	console.log('c');

	const vals: { value: number }[] = [];
	for (let i = 0; i < nodeCount; ++i) {
		vals.push({ value: i });
	}

	console.log('d');

	const shuffledList = knuthShuffle(vals.slice(0));

	console.log('e');

	const startTime = window.performance.now();
	const stepper = algorithm.call({ comparator }, shuffledList);
	while (!stepper.next().done);
	const endTime = window.performance.now();

	return endTime - startTime;
};

export default useAlgorithmRunner;
