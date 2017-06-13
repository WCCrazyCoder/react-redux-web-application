var path = require('path');
var webpack = require('webpack');

const projectRootPath = path.resolve(__dirname, '..');
const config = {
	devtool: 'source-map',
	context: projectRootPath,
	entry: {
		main: [
			'./src/client.js'
		],
		vendor: [
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'superagent'
		]
	},
	output: {
		path: path.resolve(projectRootPath, 'dist'),
		filename: '[name].min.js',
		chunkFilename: '[name].min.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEV__: true,
			__PROD__: true,
			__DEVTOOLS__: false
		})
	]
};

module.exports = config;
