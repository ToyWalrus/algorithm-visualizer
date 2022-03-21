import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

const App2 = () => {
  return (
    <Router>
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

export default App2;
