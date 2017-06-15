import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { StaticRouter } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from '../../src/redux/createStore';
import APIClient from '../../src/helpers/APIClient';
import Html from '../../src/helpers/Html';
import App from '../../src/containers/App';
import routes from '../../src/routes';

const serverRouteMidlleware = () => (req, res, next) => {

	const memoryHistory = createMemoryHistory();
	const client = new APIClient(req);
	const store = createStore(history, client);
	const history = syncHistoryWithStore(memoryHistory, store);

	const context = {};
	const component = (
		<Provider store={store} key="provider" >
			<StaticRouter history={history} location={req.url} context={context}>
				<App>
					{ routes(store) }
				</App>
			</StaticRouter>
		</Provider>
	);
	
	if (context.url) {
		res.writeHead(302, {
			Location: context.url
		});
	} else {
		res.send(`<!doctype html>${ ReactDOM.renderToString(<Html store={store} component={component} />) }`);
	}
}

export default serverRouteMidlleware;
