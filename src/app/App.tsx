import { useEffect, useState } from 'react';
import shuffle from 'shuffle-array';
import MergeSortVisualizer from '../components/MergeSortVisualizer/MergeSortVisualizer';
import Scaffold from '../components/Scaffold/Scaffold';
import Node from '../model/Node';
import SettingsPanel, { SettingsPanelArgs } from '../components/SettingsPanel/SettingsPanel';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/theme';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import { Typography } from '@material-ui/core';
import {
  MenuOpen as MergeSortIcon,
  BubbleChart as BubbleSortIcon,
  LowPriority as QuickSortIcon,
} from '@material-ui/icons';

// https://www.framer.com/api/motion/animation/
function App() {
  const [count, setCount] = useState(10);
  const [sortSpeed, setSortSpeed] = useState(250);
  const [nodeList, setNodeList] = useState([] as Node[]);

  useEffect(() => {
    let list: number[] = [];
    for (let i = 1; i <= count; ++i) {
      list.push(i);
    }
    setNodeList(makeNodeList(...list));
  }, [count]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Scaffold
          title="Algorithm Visualizer"
          hideSideNav={false}
          navItems={routes.map(route => ({
            route,
          }))}
          settingsPanel={makeSettingsPanel({
            sortSpeed: sortSpeed,
            onChangeSortSpeed: setSortSpeed,
            elementCount: count,
            onChangeElementCount: setCount,
          })}
        >
          <Switch>
            {routes.map(route => {
              return (
                <Route key={route.path} path={route.path}>
                  {route.Visualizer && <route.Visualizer items={nodeList} sortStepDelay={sortSpeed} />}
                </Route>
              );
            })}
            <Route key="home" path="/">
              <Typography variant="h1" style={{ color: theme.palette.primary.contrastText }}>
                Home
              </Typography>
            </Route>
          </Switch>
        </Scaffold>
      </Router>
    </ThemeProvider>
  );
}

const makeSettingsPanel = (args: SettingsPanelArgs) => {
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
