import { useEffect, useState } from 'react';
import Node from '../model/Node';
import SettingsPanel, { SettingsPanelProps } from '../components/SettingsPanel/SettingsPanel';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import routes from './routes';
import { NavItem } from '../components/NavItems/NavItems';
import './App.css';
import AlgorithmSelector from '../components/AlgorithmSelector/AlgorithmSelector';

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
			}),
		);
	}, [updateRoute]);

	return (
		<Router>
			<AlgorithmSelector options={[
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
			]} />
			<Switch>
				{routes.map(route => {
					return (
						<Route key={route.path} path={route.path}>
							{route.Visualizer && (
								<route.Visualizer items={nodeList} sortStepDelay={sortSpeed} />
							)}
						</Route>
					);
				})}
			</Switch>
		</Router>
	);
};

const makeSettingsPanel = (args: SettingsPanelProps) => {
	return <SettingsPanel {...args} />;
};

const makeNodeList = (...args: number[] | string[]): Node[] => {
	const list: Node[] = [];
	args.forEach((arg, idx) => {
		list.push(new Node({ value: arg, index: idx, id: idx }));
	});
	return list;
};

export default App;