import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './redux/createStore';
import routes from './routes';
import App from './containers/App';
import Home from './containers/Home/container/Home';

const browserHistory = createBrowserHistory();
const store = createStore(browserHistory, {}, window.__redux_data__);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
	<Provider store={store} key="provider">
		<Router>
			<App>
				{ routes(store) }
			</App>
		</Router>
	</Provider>
);

ReactDOM.render(
	component,
	document.getElementById("app")
);

if (__DEV__ && module.hot) {
	module.hot.accept();
}
