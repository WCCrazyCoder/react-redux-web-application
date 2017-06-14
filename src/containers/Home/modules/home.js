const HOMEPAGE = 'home/HOMEPAGE';

export function changeUsername() {
	return {
		type: HOMEPAGE,
		payload: { name: 'dreampark' }
	}
}

const ACTION_HANDLERS = {
	[HOMEPAGE]		: (state, action) => ({ ...state, name: action.payload.name })
};

const initialState = {
	name: 'wang'
};

export default function home(state=initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
