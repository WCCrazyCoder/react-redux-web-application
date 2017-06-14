import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeUsername } from '../modules/home';

@connect(
	state => ({
		name: state.home.name
	}),
	dispatch => bindActionCreators({ changeUsername }, dispatch)
)

export default class Home extends React.Component {
	render() {
		// console.log(this.props.name);
		console.log(this.props);
		return (
			<div>
				<button onClick={() => this.props.changeUsername() }>change username</button>
				<h2>Welcome to homepage ...</h2>
				<h4>{this.props.name}</h4>
			</div>
		);
	}
}
