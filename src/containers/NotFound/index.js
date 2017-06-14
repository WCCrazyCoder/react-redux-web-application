import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from './container/NotFound';

export const NotFoundContainer = ({ store, ...rest }) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				<NotFound {...props} />
			)
		}} />
	)
}

export default NotFoundContainer;
