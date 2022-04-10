import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import App from './app/App';
import { createBrowserHistory } from 'history';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('algorithm-visualizer')
);
