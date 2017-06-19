import React from 'react';
import { connect } from 'react-redux';

@connect(
	state => ({
		user: state.home ? state.home.user : undefined
	})
)

export default class About extends React.Component {
	componentDidMount() {
		if (!this.props.user) this.props.history.push('/');
	}
	render() {
		const styles = require('./About.scss');
		let content = (<div>未认证</div>);
		if (this.props.user) {
			content = (
				<div>
					<div className={styles.verified}>
						<h2>已认证</h2>
					</div>
					<div className={styles.wechat}>
						<img src={this.props.user.headimgurl} alt="avatar" /><br />
						<div>{this.props.user.nickname}</div>
					</div>
					<div className={styles.userinfo}>
						<div>{`姓 名: ${this.props.user.username}`}</div>
						<div>{`身份证: ${this.props.user.cardno}`}</div>
					</div>
				</div>			
			);			
		}
		return (
			<div>
				{ content }
			</div>
		)
	}
}
