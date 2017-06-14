import React from 'react';
import { Route } from 'react-router-dom';
import About from './container/About';

export const AboutContainer = ({ store, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			console.log(store);
			// injectReducer(store, { key: 'home', reducer });
			return (
				<About {...props} />
			)
		}} />
	)
}

export default AboutContainer;