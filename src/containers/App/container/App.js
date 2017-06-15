import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
	render() {
		const { history } = this.props;
		return (
			<div>
				<div>
					<h1>Hello React</h1>
				</div>
				<div>
					{ this.props.children }
				</div>
			</div>
		)
	}
}
