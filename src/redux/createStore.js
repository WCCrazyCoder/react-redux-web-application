import { compose, applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { makeRootReducer } from './reducers';

export const createStore = (history, client, preloadedState) => {
	let store = {};
	if (__DEV__ && __CLIENT__ && __DEVTOOLS__) {
		store = createReduxStore(
			makeRootReducer(),
			preloadedState,
			compose(
				applyMiddleware(thunk)
			)
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
