
const ABOUT = 'about/ABOUT';

const ACTION_HANDLERS = {
	[ABOUT]		:	(state, action) => ({...state})
};

const initialState = {
	description: 'this is about page'
};

export default function about(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
