import React from 'react';
import projectConfig from '../../../../project.config.js';

export default class WeChatLogin extends React.Component {

	componentWillMount() {
		// window.location.href = projectConfig.weChatAuthorizationUrl;
		window.location.href = 'http://localhost:3000?code=123';
	}
	render() {
		return (
			<div style={{ visibility: 'hidden' }}>
				WeChat Login
			</div>
		)
	}
}
