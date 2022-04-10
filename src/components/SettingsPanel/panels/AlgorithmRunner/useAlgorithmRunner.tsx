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
const shuffleFunctionString = knuthShuffle
	.toString()
	.substring(knuthShuffle.toString().indexOf('{') + 1, knuthShuffle.toString().lastIndexOf('}'));

const useAlgorithmRunner = ({ settings, nodeMultipliers, dependencyArr }: UseAlgorithmRunnerProps) => {
	const [currentAlgorithmTitle, setCurrentAlgorithmTitle] = useState(settings.algorithmOption.title);

	const runTimes: RunTimeUseState[] = [];
	const runningAlgorithms: RunningAlgorithmsUseState[] = [];
	const workers: Worker[] = [];

	const remoteDependencies: string[] = [];
	remoteDependencies.push(window.location.origin + '/algorithms/QuickSort.js');
	remoteDependencies.push(window.location.origin + '/algorithms/MergeSort.js');
	remoteDependencies.push(window.location.origin + '/algorithms/BubbleSort.js');

	for (let i = 0; i < nodeMultipliers.length; ++i) {
		runTimes.push(useState<number | undefined>());
		runningAlgorithms.push(useState<boolean>(false));
		workers.push(useWorker(runAlgorithm, { remoteDependencies })[0]);
	}

	const setAllTo = (arr: (RunTimeUseState | RunningAlgorithmsUseState)[], value: any) => {
		arr.forEach(el => {
			const setter = el[1];
			setter(value);
		});
	};

	// Reset run time whenever applicable settings change
	useEffect(() => {
		if (runningAlgorithms.every(el => !el[0])) {
			setAllTo(runTimes, undefined);
			setCurrentAlgorithmTitle(settings.algorithmOption.title);
		}
	}, dependencyArr);

	const onRunAlgorithm = () => {
		setCurrentAlgorithmTitle(settings.algorithmOption.title);
		setAllTo(runningAlgorithms, true);

		for (let i = 0; i < nodeMultipliers.length; ++i) {
			const multiplier = nodeMultipliers[i];
			const worker = workers[i];
			const runtimeSetter = runTimes[i][1];
			const algorithmRunningSetter = runningAlgorithms[i][1];
			const workerArgs: RunAlgorithmProps = {
				shuffleFunctionStrings: ['n', shuffleFunctionString],
				nodeCount: settings.nodeCount * multiplier,
				algorithm: settings.algorithmOption.algorithm.constructor.name,
			};

			worker(workerArgs)
				.then(millisecondsPassed => {
					runtimeSetter(millisecondsPassed / 1000);
					algorithmRunningSetter(false);
				})
				.catch(e => {
					runtimeSetter(-1);
					algorithmRunningSetter(false);
					console.error('Unable to complete algorithm:', { error: e, workerArgs });
				});
		}
	};

	return {
		runTimes: runTimes.map(v => v[0]),
		runningAlgorithms: runningAlgorithms.map(v => v[0]),
		onRunAlgorithm,
		currentAlgorithmTitle,
	};
};

interface RunAlgorithmProps {
	shuffleFunctionStrings: string[];
	nodeCount: number;
	algorithm: string;
}

// Have to declare these as variables here so
// that the analyzer won't freak out on using them
// in the web worker function
let BubbleSort, QuickSort, MergeSort;

// To prevent killing the web page when node count is huge, break this functionality into a webworker
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
const runAlgorithm = ({ algorithm: algorithmName, shuffleFunctionStrings, nodeCount }: RunAlgorithmProps) => {
	const shuffle = new Function(...shuffleFunctionStrings);

	let algorithm: any;
	switch (algorithmName) {
		case 'BubbleSort':
			algorithm = new BubbleSort();
			break;
		case 'QuickSort':
			algorithm = new QuickSort();
			break;
		case 'MergeSort':
			algorithm = new MergeSort();
			break;
		default:
			return -1000;
	}

	const vals: { value: number }[] = [];
	for (let i = 0; i < nodeCount; ++i) {
		vals.push({ value: i });
	}

	const shuffledList = shuffle(vals.slice(0));
	const startTime = self.performance.now();
	const stepper = algorithm.sort(shuffledList);
	while (!stepper.next().done);
	const endTime = self.performance.now();

	return endTime - startTime;
};

export default useAlgorithmRunner;
