import superagent from 'superagent';

const INCREMENT = 'home/INCREMENT';
const DECREMENT = 'home/DECREMENT';

const HOMEPAGE = 'home/HOMEPAGE';
const HOMEPAGE_FULFILLED = 'home/HOMEPAGE_FULFILLED';

export function increment() {
	return {
		type: INCREMENT
	};
}

export function decrement() {
	return {
		type: DECREMENT
	};
}

export function getHomepageJSON() {
	return (dispatch, getState) => {
		dispatch({
			type: HOMEPAGE,
			payload: (client) => client.get('web/homepage')
		}); 
	}
}

const ACTION_HANDLERS = {
	[INCREMENT]				: (state, action) => ({ ...state, counter: state.counter + 1 }),
	[DECREMENT]				: (state, action) => ({ ...state, counter: state.counter - 1 }),
	[HOMEPAGE_FULFILLED]	: (state, action) => ({ ...state, homepageJSON: action.payload })
};

const initialState = {
	counter: 100,
	homepageJSON: null
};

export default function home(state=initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
