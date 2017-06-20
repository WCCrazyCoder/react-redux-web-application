import React from 'react';
import { Route } from 'react-router-dom';
import WeChatLogin from './container/WeChatLogin';

export const WeChatLoginRoute = ({ store, injectReducer, ...rest}) => {
	return (
		<Route {...rest} render={(props) => {
			return (
				<WeChatLogin {...props} />
			)
		}} />
	)
}

export default WeChatLoginRoute;
