import React from 'react';
import { Route } from 'react-router-dom';
import Home from './container/Home';
import reducer from './modules/home';
import { injectReducer } from '../../redux/reducers';

export const HomeContainer = ({ store, ...rest }) => {
	return (
		<Route {...rest} render={(props) => {
			injectReducer(store, { key: 'home', reducer });
			return (
				<Home {...props} />
			)
		}} />
	)
}

export default HomeContainer;
