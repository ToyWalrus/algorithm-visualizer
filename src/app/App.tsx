import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import SettingsPanel from 'components/SettingsPanel/SettingsPanel';
import AlgorithmSelector from 'components/SettingsPanel/panels/AlgorithmSelector/AlgorithmSelector';
import AlgorithmInfo from 'components/SettingsPanel/panels/AlgorithmInfo/AlgorithmInfo';
import VisualizationSettings from 'components/SettingsPanel/panels/VisualizationSettings/VisualizationSettings';
import SettingsProvider from 'components/SettingsProvider';
import SettingsContext, { defaultSettings } from 'model/SettingsContext';
import routes from './routes';
import {
	VisualizationAreaComponentProps,
	VisualizationAreaProps,
} from 'components/Visualizers/VisualizationArea/VisualizationArea';

// https://www.framer.com/api/motion/animation/
const App = () => {
	const { history, settingsPanelOpen } = useAppHook();

	const settingsPanelSections = [
		{
			title: 'Algorithm Selection',
			children: (
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
			children: <AlgorithmInfo />,
		},
		{
			title: 'Settings',
			children: <VisualizationSettings />,
		},
	];

	const defaultRoute = routes.find(
		r => r.title.toLowerCase() === defaultSettings.algorithmOption.title.toLowerCase()
	);

	const createVisualizer = (Visualizer: (args: VisualizationAreaComponentProps) => JSX.Element) => (
		<SettingsContext.Consumer>
			{({ settings }) => <Visualizer isSettingsPanelOpen={settingsPanelOpen} settings={settings} />}
		</SettingsContext.Consumer>
	);

	return (
		<SettingsProvider>
			<SettingsPanel isOpen={settingsPanelOpen} sections={settingsPanelSections} />
			<Switch>
				{defaultRoute && defaultRoute.Visualizer && (
					<Route key="default-route" exact path="/">
						{createVisualizer(defaultRoute.Visualizer)}
					</Route>
				)}
				{routes.map(({ path, Visualizer }) => (
					<Route key={path} path={path}>
						{Visualizer && createVisualizer(Visualizer)}
					</Route>
				))}
			</Switch>
		</SettingsProvider>
	);
};

const useAppHook = () => {
	const panelBreakpoint = 1000;
	const [settingsPanelOpen, setSettingsPanelOpen] = useState(window.innerWidth >= panelBreakpoint);
	const history = useHistory();

	useEffect(() => {
		const checkSettingsPanelBreakpoint = () => {
			if (window.innerWidth < panelBreakpoint) {
				setSettingsPanelOpen(false);
			} else if (window.innerWidth >= panelBreakpoint) {
				setSettingsPanelOpen(true);
			}
		};

		window.addEventListener('resize', checkSettingsPanelBreakpoint);
		return () => window.removeEventListener('resize', checkSettingsPanelBreakpoint);
	}, []);

	return {
		settingsPanelOpen,
		setSettingsPanelOpen: (open: boolean) => {
			const canControlPanel = window.innerWidth < panelBreakpoint;
			if (!canControlPanel) return;
			setSettingsPanelOpen(open);
		},
		history,
	};
};

export default App;
