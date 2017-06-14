import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';

export const makeRootReducer = (asyncReducers) => {
	return combineReducers({
		routing: routerReducer,
		...asyncReducers
	})
}

export const injectReducer = (store, { key, reducer } = {}) => {
	if (Object.prototype.hasOwnProperty.call(store.asyncReducers, key)) return;
	store.asyncReducers[key] = reducer;
	store.replaceReducer(makeRootReducer(store.asyncReducers));
}

export default makeRootReducer;
