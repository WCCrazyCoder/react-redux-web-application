import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../../src/helpers/Html';

const serverRouteMidlleware = () => (req, res) => {
	const htmlString = '<!doctype html>' +
		ReactDOM.renderToString(<Html />);
	res.send(htmlString);
}

export default serverRouteMidlleware;
