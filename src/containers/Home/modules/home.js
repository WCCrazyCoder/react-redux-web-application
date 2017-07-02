import superagent from 'superagent';

const INCREMENT = 'home/INCREMENT';
const DECREMENT = 'home/DECREMENT';

const HOMEPAGE = 'home/HOMEPAGE';
const HOMEPAGE_FULFILLED = 'home/HOMEPAGE_FULFILLED';

const REGISTER = 'home/HOMEPAGE_REGISTER';
const REGISTER_PENDING = 'home/HOMEPAGE_REGISTER_PENDING';
const REGISTER_FULFILLED = 'home/HOMEPAGE_REGISTER_FULFILLED';
const REGISTER_REJECTED = 'home/HOMEPAGE_REGISTER_REJECTED';

const USERINFO = 'home/USERINFO';
const USERINFO_PENDING = 'home/USERINFO_PENDING';
const USERINFO_FULFILLED = 'home/USERINFO_FULFILLED';
const USERINFO_REJECTED = 'home/USERINFO_REJECTED';

const WECHAT_USERINFO = 'home/WECHAT_USERINFO';
const WECHAT_USERINFO_PENDING = 'home/WECHAT_USERINFO_PENDING';
const WECHAT_USERINFO_FULFILLED = 'home/WECHAT_USERINFO_FULFILLED';
const WECHAT_USERINFO_REJECTED = 'home/WECHAT_USERINFO_REJECTED';

/**
 *	根据身份证和用户名验证身份
 */
function getUserInfoOf(name, cardno) {
	return new Promise((resolve, reject) => {
		// const request = superagent.get('http://idcard.market.alicloudapi.com/lianzhuo/idcard');
		const request = superagent.get(`http://192.168.6.4:3000/api/user/idcard`);
		// request.query({ cardno });
		// request.set('Authorization', 'APPCODE 00c180eae8664be9b7157b49281cb9d6');
		request.end((error, {body}) => {
			if (error) {
				reject(body || error);
			} else {
				resolve(body)
			}
		});
	});
}

/**
 *	注册用户
 */
export function register(username, cardno) {
	return (dispatch, getState) => {
		dispatch({
			type: REGISTER,
			payload: (client) => getUserInfoOf(username, cardno)
				.then((matchInfo) => {
					if (matchInfo.resp && matchInfo.resp.code === 0) {
						const { openid, unionid, nickname, headimgurl } = getState().home.weChatInfo;
						const simplyInfo = { openid, unionid, nickname, headimgurl };
						const data = Object.assign({username, cardno}, matchInfo.data, simplyInfo);
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

/**
 *
 */
export function getUserInfo(queryObject) {
	return {
		type: USERINFO,
		payload: (client) => client.get('/user/userinfo', { params: queryObject })
	}
}

/**
 *	根据微信的code获取微信的用户信息
 */
export function getWeChatUserInfo(code) {
	return {
		type: WECHAT_USERINFO,
		payload: (client) => client.get('/user/wechat', { params: { code } })
	}
}

const ACTION_HANDLERS = {
	[REGISTER_PENDING]		: (state, action) => ({...state, registerLoading: true}),
	[REGISTER_FULFILLED]	: (state, action) => ({...state, registerLoading: false, user: action.payload.data}),
	[REGISTER_REJECTED]		: (state, action) => ({...state, registerLoading: false}),

	[USERINFO_PENDING] : (state, action) => ({...state, loading: true}),
	[USERINFO_FULFILLED] : (state, action) => ({...state, loading: false, user: action.payload.data}),
	[USERINFO_REJECTED] : (state, action) => ({...state, loading: false, userError: action.payload.data}),

	[WECHAT_USERINFO_PENDING] : (state, action) => ({...state, loading: true}),
	[WECHAT_USERINFO_FULFILLED] : (state, action) => ({...state, loading: false, weChatInfo: action.payload.data}),
	[WECHAT_USERINFO_REJECTED] : (state, action) => ({...state, loading: false, weChatErr: action.payload.data}),
};

const initialState = {
	loading: false,
	user: {},
	weChatInfo: {}
};

export default function home(state=initialState, action) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}
