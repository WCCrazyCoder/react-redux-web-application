export default function clientMiddleware(client) {
	return ({ dispatch, getState }) => next => action => {
		const { payload  } = action;
		if (typeof payload === 'function') action.payload = payload(client);
		next(action);
	};
}
