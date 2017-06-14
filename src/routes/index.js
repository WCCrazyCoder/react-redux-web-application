import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeRoute from '../containers/Home';
import AbouteRoute from '../containers/About';
import NotFoundRoute from '../containers/NotFound';

const routes = (store) => {
	return (
		<div>
			<Switch>
				<Route exact path="/" render={(props) => HomeRoute(store)} />
				<AbouteRoute exact path="/about" />
				<NotFoundRoute />
			</Switch>
		</div>
	)
};

export default routes;
