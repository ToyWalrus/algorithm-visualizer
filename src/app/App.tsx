import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { NavItem } from 'components/NavItems/NavItems';
import SettingsPanel from 'components/SettingsPanel/SettingsPanel';
import AlgorithmSelector from 'components/SettingsPanel/panels/AlgorithmSelector/AlgorithmSelector';
import AlgorithmInfo from 'components/SettingsPanel/panels/AlgorithmInfo/AlgorithmInfo';
import VisualizationSettings from 'components/SettingsPanel/VisualizationSettings/VisualizationSettings';
import SettingsProvider from 'components/SettingsProvider';
import Node from 'model/Node';
import routes from './routes';
import './App.css';

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
			content: <AlgorithmSelector />,
		},
		{
			title: 'Algorithm Info',
			content: <AlgorithmInfo />,
		},
		{
			title: 'Settings',
			content: <VisualizationSettings />,
		},
	];

	return (
		<Router>
			<SettingsProvider>
				<SettingsPanel sections={settingsPanelSections} />
			</SettingsProvider>
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
