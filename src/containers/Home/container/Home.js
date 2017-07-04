import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register, getUserInfo, getWeChatUserInfo } from '../modules/home';
import projectConfig from '../../../../project.config';

@connect(
	state => ({
		registerLoading: state.home.registerLoading,
		user: state.home.user,
		weChatInfo: state.home.weChatInfo
	}),
	dispatch => bindActionCreators({ register, getUserInfo, getWeChatUserInfo }, dispatch)
)

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.handleOkButtonClick = (e) => this._handleOkButtonClick(e);
		this.onChange = (e) => this._onChange(e);
		this.state = {
			username: '',
			idcard: ''
		};
	}

	_onChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	_handleOkButtonClick(e) {
		e.preventDefault();

		if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.state.idcard)) {
			window.alert('请输入正确身份证号码'); return;
		}
		if(this.state.username.length > 0 && this.state.idcard.length > 0) {
			this.props.register(this.state.username, this.state.idcard);
		} else {
			window.alert('请输入正确的姓名和身份证信息!');
		}
	}

	componentWillMount() {
		const getQueryValueOf = key => decodeURIComponent(this.props.location.search.replace(new RegExp('^(?:.*[&\\?]' + escape(key).replace(/[.+*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
		const code = getQueryValueOf('code');
		if (code) {
			this.props.getWeChatUserInfo(code);
		} else {
			location.href = projectConfig.weChatAuthorizationUrl;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.props.user) {
			this.props.history.push('/about');
		} else if (nextProps.weChatInfo !== this.props.weChatInfo) {
			this.props.getUserInfo({ openid: nextProps.weChatInfo.openid });
		}
	}

	render() {
		const styles = require('./Home.scss');
		const buttonMessage = this.props.registerLoading ? '发送中...' : '确定';
		const style = { backgroundColor: this.props.weChatInfo ? 'transparent' : 'white' };
		return (
			<div style={style} className={styles.home}>
				{this.props.weChatInfo &&
					<div>
						<div className={styles.tip}>
							<h2>阿拉善首届啤酒节</h2>
							<h2>请验证您信息, 一起狂欢!</h2>
						</div>
						<div className={styles.container}>
							<div className={styles.flexItem}>
								<label className={styles.customLabel + ' ' + styles.usernameLabel} htmlFor="username">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
								<input id="username" className={styles.customInput} onChange={this.onChange} placeholder="姓名" />
							</div>
							<div className={styles.flexItem}>
								<label className={styles.customLabel} htmlFor="idcard">身&nbsp;份&nbsp;证: </label>
								<input id="idcard" className={styles.customInput} onChange={this.onChange} type="number" placeholder="身份证号码" />
							</div>
							<div className={styles.okButton}>
								<button disabled={this.props.loading} onClick={this.handleOkButtonClick}>{buttonMessage}</button>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
