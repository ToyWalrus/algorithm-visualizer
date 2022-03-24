import { useEffect, useState } from 'react';
import Node from '../model/Node';
import SettingsPanel from '../components/SettingsPanel/SettingsPanel';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import routes from './routes';
import { NavItem } from '../components/NavItems/NavItems';
import './App.css';
import AlgorithmSelector from '../components/SettingsPanel/panels/AlgorithmSelector/AlgorithmSelector';
import AlgorithmInfo from '../components/SettingsPanel/panels/AlgorithmInfo/AlgorithmInfo';
import VisualizationSettings from '../components/SettingsPanel/VisualizationSettings/VisualizationSettings';
import { SortSpeed } from '../utils/Enums';

// https://www.framer.com/api/motion/animation/
const App = () => {
	const [count, setCount] = useState(10);
	const [updateRoute, setUpdateRoute] = useState(0);
	const [sortSpeed, setSortSpeed] = useState(250);
	const [nodeList, setNodeList] = useState([] as Node[]);
	const [mappedRoutes, setMappedRoutes] = useState([] as NavItem[]);
	const history = useHistory();

	useEffect(() => {
		let list: number[] = [];
		for (let i = 1; i <= count; ++i) {
			list.push(i);
		}
		setNodeList(makeNodeList(...list));
	}, [count]);

	useEffect(() => {
		setMappedRoutes(
			routes.map<NavItem>(route => {
				let isActiveRoute = window.location.pathname === route.path;
				return {
					route,
					selected: isActiveRoute,
				};
			})
		);
	}, [updateRoute]);

	const settingsPanelSections = [
		{
			title: 'Algorithm Selection',
			content: (
				<AlgorithmSelector
					options={[
						{
							onSelect: () => history.push('/mergeSort'),
							isSelected: false,
							title: 'Merge sort',
						},
						{
							onSelect: () => history.push('/bubbleSort'),
							isSelected: true,
							title: 'Bubble sort',
						},
						{
							onSelect: () => history.push('/quickSort'),
							isSelected: false,
							title: 'Quick sort',
						},
					]}
				/>
			),
		},
		{
			title: 'Algorithm Info',
			content: (
				<AlgorithmInfo
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
					uses="Useful when you have a small list I guess?"
					complexity={
						<span>
							O(n<sup>2</sup>)
						</span>
					}
				/>
			),
		},
		{
			title: 'Settings',
			content: (
				<VisualizationSettings
					nodeCount={10}
					sortSpeed={SortSpeed.fast}
					primaryColor="F2CF63"
					alternateColor="9340cf"
					onNodeCountChange={() => null}
					onSortSpeedChange={() => null}
					onPrimaryColorChange={() => null}
					onAlternateColorChange={() => null}
				/>
			),
		},
	];

	return (
		<Router>
			<SettingsPanel sections={settingsPanelSections} />

			<Switch>
				{routes.map(route => {
					return (
						<Route key={route.path} path={route.path}>
							{route.Visualizer && <route.Visualizer items={nodeList} sortStepDelay={sortSpeed} />}
						</Route>
					);
				})}
			</Switch>
		</Router>
	);
};

const makeNodeList = (...args: number[] | string[]): Node[] => {
	const list: Node[] = [];
	args.forEach((arg, idx) => {
		list.push(new Node({ value: arg, index: idx, id: idx }));
	});
	return list;
};

export default App;
