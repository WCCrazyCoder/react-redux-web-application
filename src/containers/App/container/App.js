import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends React.Component {
	render() {
		const { history } = this.props;
		const style = {
			position: 'absolute',
			backgroundImage: `url('pj.jpg')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			width: '100%',
			height: '100%',
			zIndex: '-1'
		};
		return (
			<div>
				<div style={style} />
				<div>
					{ this.props.children }
				</div>
			</div>
		)
	}
}
