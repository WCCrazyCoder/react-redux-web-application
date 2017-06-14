import React from 'react';

export default class About extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<h3>This is the about dreampack ...</h3>
				<h1>{this.props.match.params.user}</h1>
			</div>
		)
	}
}
