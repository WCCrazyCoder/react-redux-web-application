import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

export default class Html extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		component: PropTypes.node
	}

	render() {
		const content = this.props.component ? renderToString(this.props.component) : ' ';
		console.log(1111);
		console.log(content);
		return (
			<html lang="en-US">
				<head>
		        	<link rel="manifest" href="/manifest.json" />
		            <meta name="msapplication-TileColor" content="#ffffff" />
		            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
		            <meta name="theme-color" content="#ffffff" />
		            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
		        </head>
	            <body>
	           		<div id="app" dangerouslySetInnerHTML={{ __html: content }} />
	           		<script dangerouslySetInnerHTML={{ __html: `window.__redux_data__ = ${serialize(this.props.store.getState())}` }} charSet="UTF-8" />
   		            <script src='/dist/manifest.min.js' />
		            <script src='/dist/reactLibrary.min.js' />
		            <script src='/dist/vendor.min.js' />
		            <script src='/dist/main.min.js' />
	            </body>
			</html>
		);
	}
}
