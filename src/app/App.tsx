import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SettingsPanel from 'components/SettingsPanel/SettingsPanel';
import AlgorithmSelector from 'components/SettingsPanel/panels/AlgorithmSelector/AlgorithmSelector';
import AlgorithmInfo from 'components/SettingsPanel/panels/AlgorithmInfo/AlgorithmInfo';
import VisualizationSettings from 'components/SettingsPanel/panels/VisualizationSettings/VisualizationSettings';
import SettingsProvider from 'components/SettingsProvider';
import SettingsContext from 'model/SettingsContext';
import routes from './routes';
import './App.css';

// https://www.framer.com/api/motion/animation/
const App = () => {
	const history = useHistory();

	const settingsPanelSections = [
		{
			title: 'Algorithm Selection',
			content: (
				<AlgorithmSelector
					onSelectAlgorithm={op => {
						for (const route of routes) {
							if (op.title.toLowerCase() === route.title.toLowerCase()) {
								history.push(route.path);
								return;
							}
						}
					}}
				/>
			),
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
		<SettingsProvider>
			<SettingsPanel sections={settingsPanelSections} />
			<Switch>
				{routes.map(({ path, Visualizer }) => (
					<Route key={path} path={path}>
						{Visualizer && (
							<SettingsContext.Consumer>
								{({ settings }) => <Visualizer activeSettings={settings} />}
							</SettingsContext.Consumer>
						)}
					</Route>
				))}
			</Switch>
		</SettingsProvider>
	);
};

export default App;
