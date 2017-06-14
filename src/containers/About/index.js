import React from 'react';
import { Route } from 'react-router-dom';
import About from './container/About';
import reducer from './modules/about';

export const AboutRoute = ({ store, injectReducer, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			if (store && typeof injectReducer === 'function') injectReducer(store, { key: 'about', reducer });
			return (
				<About {...props} />
			)
		}} />
	)
}

export default AboutRoute;