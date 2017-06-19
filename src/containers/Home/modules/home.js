import superagent from 'superagent';

const INCREMENT = 'home/INCREMENT';
const DECREMENT = 'home/DECREMENT';

const HOMEPAGE = 'home/HOMEPAGE';
const HOMEPAGE_FULFILLED = 'home/HOMEPAGE_FULFILLED';
const REGISTER = 'home/HOMEPAGE_REGISTER';
const REGISTER_PENDING = 'home/HOMEPAGE_REGISTER_PENDING';
const REGISTER_FULFILLED = 'home/HOMEPAGE_REGISTER_FULFILLED';
const REGISTER_REJECTED = 'home/HOMEPAGE_REGISTER_REJECTED';

function getUserInfoOf(name, cardno) {
	return new Promise((resolve, reject) => {
		// const request = superagent.get('http://idcard.market.alicloudapi.com/lianzhuo/idcard');
		const request = superagent.get('http://localhost:3000/api/user/idcard');
		// request.query({ cardno });
		// request.set('Authorization', 'APPCODE 00c180eae8664be9b7157b49281cb9d6');
		window.alert(request);
		request.end((error, { body }) => {
			if (error) {
				reject(body || error);
			} else {
				resolve(body)
			}
		});
	});
}

export function register(username, cardno) {
	return (dispatch, getState) => {
		dispatch({
			type: REGISTER,
			payload: (client) => getUserInfoOf(username, cardno)
				.then((matchInfo) => {
					if (matchInfo.resp.code === 0) {
						const data = Object.assign({username, cardno}, matchInfo.data, getState().home.weiChatInfo);
						return client.post('/user/register', { data })								
					} else {
						return Promise.resolve(matchInfo);
					}
				})
				.catch((e) => {
					console.log(e);
					return Promise.reject(e);
				})
		});
	}
}

const ACTION_HANDLERS = {
	[REGISTER_PENDING]		: (state, action) => ({...state, loading: true}),
	[REGISTER_FULFILLED]	: (state, action) => ({...state, loading: false, user: action.payload.data}),
	[REGISTER_REJECTED]		: (state, action) => ({...state, loading: false})
};

const initialState = {
	loading: false,
	user: {},
	weiChatInfo: {
		openid: 'osasdqweip12390sdlkfj',
		unionid: 'o6_bmasdasdsad6_2sgVt7hMZOPfL',
		nickname: '维护世界和平',
		headimgurl: 'http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0',
	}
};

export default function home(state=initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
