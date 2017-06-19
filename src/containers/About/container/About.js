import React from 'react';
import { connect } from 'react-redux';

@connect(
	state => ({
		user: state.home.user
	})
)

export default class About extends React.Component {
	render() {
		return (
			<div>
				<h3>This is the about dreampack ...</h3>
				<h4>{JSON.stringify(this.props.user)}</h4>
			</div>
		)
	}
}
