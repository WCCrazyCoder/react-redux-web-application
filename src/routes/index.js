import React from 'react';
import { Switch } from 'react-router-dom';

import { injectReducer } from '../redux/reducers';
import HomeRoute from '../containers/Home';
import AbouteRoute from '../containers/About';
import WeChatLoginRoute from '../containers/WeChatLogin';
import NotFoundRoute from '../containers/NotFound';

const routes = (store) => {
	return (
		<Switch>
			<HomeRoute exact path="/" store={store} injectReducer={injectReducer} />
			<AbouteRoute exact path="/about" />
			<WeChatLoginRoute exact path="/authorization" />
			<NotFoundRoute />
		</Switch>
	)
};

export default routes;
