var Express = require('express');
var path = require('path');
var fs = require('fs');
var compression = require('compression');
var favicon = require('serve-favicon');
var webpack = require('webpack');
var webpackConfig = require('../webpack/webpack.config.js');
var userRouter = require('./serverRouters/userRouter');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 80;
const compiler = webpack(webpackConfig);

var app = new Express();
app.use(compression());
app.use(favicon(path.resolve(__dirname, '../assets/favicon.ico')));

app.use(Express.static(path.resolve(__dirname, '../assets')));
app.use(Express.static(path.resolve(__dirname, '../dist')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.method === 'OPTIONS') return res.end();
	next();
});

if (process.env.NODE_ENV === 'development' || __DEV__ ) {
	app.use(require('morgan')('tiny'));
	app.use(require('webpack-dev-middleware')(compiler, {
		quiet: true,
	  	noInfo: true,
	  	hot: true,
	  	lazy: false,
	  	inline: true,
	  	publicPath: webpackConfig.output.publicPath,
	  	headers: { 'Access-Control-Allow-Origin': '*' },
	  	stats: { colors: true },
	  	// serverSideRender: true
	}));
	app.use(require('webpack-hot-middleware')(compiler, {
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	}));
}

app.use('/api/user', userRouter);

app.use('*', (req, res, next) => {
	if (__DEV__ || process.env.NODE_ENV === 'development') {
		const filename = path.join(compiler.outputPath, 'index.html');
		compiler.outputFileSystem.readFile(filename, (err, result) => {
	        if (err) return next(err);
	    	res.set('content-type', 'text/html');
	    	res.send(result);
	    	res.end();
		});
	} else {
		const filename = path.resolve(__dirname, '../dist/index.html');
		fs.readFile(filename, (err, result) => {
			if (err) return next(err);
			res.set('Content-type', 'text/html');
			res.send(result);
			res.end();
		});
	}
});

 app.listen(PORT, function(error) {
 	if (error) {
 		console.error(eror);
 	} else {
 		console.info(`\n 🌛 Listening on port ${ PORT }. Open up http://localhost:${ PORT } in your browser. \n`);
 	}
 })