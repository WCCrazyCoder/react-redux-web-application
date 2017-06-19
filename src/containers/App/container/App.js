import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
	render() {
		const { history } = this.props;
		return (
			<div>
				<div>
					{ this.props.children }
				</div>
			</div>
		)
	}
}
