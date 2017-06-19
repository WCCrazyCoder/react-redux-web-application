import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register, getHomepageJSON } from '../modules/home';

@connect(
	state => ({
		loading: state.home.loading,
		user: state.home.user
	}),
	dispatch => bindActionCreators({ register, getHomepageJSON }, dispatch)
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
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.props.user) {
			this.props.history.push('/about');
		}
	}

	render() {
		const styles = require('./Home.scss');
		const buttonMessage = this.props.loading ? '发送中...' : '确定';
		return (
			<div className={styles.home}>
				<div className={styles.tip}>
					<h4>请输入身份信息</h4>
				</div>
				<div className={styles.container}>
					<div className={styles.flexItem}>
						<label className={styles.customLabel + ' ' + styles.usernameLabel} htmlFor="username">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>							
						<input defaultValue="王超" id="username" className={styles.customInput} onChange={this.onChange} placeholder="姓名" />
					</div>
					<div className={styles.flexItem}>
						<label className={styles.customLabel} htmlFor="idcard">身份证号码: </label>
						<input defaultValue="421083199109165310" id="idcard" className={styles.customInput} onChange={this.onChange} type="number" placeholder="身份证号码" />
					</div>
					<div className={styles.okButton}>
						<button disabled={this.state.loading} onClick={this.handleOkButtonClick}>{buttonMessage}</button>
					</div>
				</div>
				<div>{JSON.stringify(this.state)}</div>
			</div>
		);
	}
}
