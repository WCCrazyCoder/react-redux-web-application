import React from 'react';
import { Route } from 'react-router-dom';
import Home from './container/Home';
import reducer from './modules/home';

export const HomeRoute = ({ store, injectReducer, ...rest }) => {
	return (
		<Route {...rest} render={(props) => {
			if (store && typeof injectReducer === 'function') injectReducer(store, { key: 'home', reducer });
			return <Home {...props} />
		}} />
	)
}

export default HomeRoute;
