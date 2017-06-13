var Express = require('express');
// var path = require('path');
import path from 'path';
var compression = require('compression');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var webpackConfig = require('../webpack/webpack.config.js');
var serverRouteMiddleware = require('./middleware/serverRouteMiddleware');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

var app = new Express();
app.use(favicon(path.resolve(__dirname, '../assets/favicon.ico')));
app.use(Express.static(path.resolve(__dirname, '../assets')));
app.use(compression());

if (process.env.NODE_ENV === 'development' || __DEV__ ) {
	app.use(require('morgan')('tiny'));
	const compiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		quiet: true,
	  	noInfo: true,
	  	hot: true,
	  	lazy: false,
	  	inline: true,
	  	publicPath: webpackConfig.output.publicPath,
	  	headers: { 'Access-Control-Allow-Origin': '*' },
	  	stats: { colors: true },
	  	serverSideRender: true
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}));
}

/**
 *	express middleware
 */
 app.use(serverRouteMiddleware());

 app.listen(PORT, function(error) {
 	if (error) {
 		console.error(eror);
 	} else {
 		console.info(`\n 🌛 Listening on port ${ PORT }. Open up http://localhost:${ PORT } in your browser. \n`);
 	}
 })