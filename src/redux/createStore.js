import { compose, applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import clientMiddleware from './reduxMiddleware/clientMiddleware';
import logger from 'redux-logger';
import { makeRootReducer } from './reducers';

export const createStore = (history, client, preloadedState) => {
	let store = {};
	if (__DEV__ && __CLIENT__) {
		store = createReduxStore(
			makeRootReducer(),
			preloadedState,
			applyMiddleware(clientMiddleware(client), thunk, promise(), logger)
		);
	} else {
		store = createReduxStore(
			makeRootReducer(),
			preloadedState,
			applyMiddleware(clientMiddleware(client), thunk, promise())
		);
	}
	store.asyncReducers = {};
	if (__DEV__ && module.hot) {
		module.hot.accept('./reducers', () => {
			store.replaceReducer(makeRootReducer(store.asyncReducers));
		});
	}
	return store;
}

export default createStore;
