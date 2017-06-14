import React from 'react';
import { Switch } from 'react-router-dom';

import { injectReducer } from '../redux/reducers';
import HomeRoute from '../containers/Home';
import AbouteRoute from '../containers/About';
import NotFoundRoute from '../containers/NotFound';

const routes = (store) => {
	return (
		<Switch>
			<HomeRoute exact path="/" store={store} injectReducer={injectReducer} />
			<AbouteRoute exact path="/about" />
			<AbouteRoute exact path="/about/:user" />
			<NotFoundRoute />
		</Switch>
	)
};

export default routes;
