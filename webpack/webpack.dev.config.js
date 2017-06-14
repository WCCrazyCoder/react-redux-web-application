var path = require('path');
var webpack = require('webpack');

const projectRootPath = path.resolve(__dirname, '..');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const config = {
	devtool: 'inline-source-map',
	context: projectRootPath,
	entry: {
		main: [
			'webpack-hot-middleware/client?reload=true',
			'webpack/hot/only-dev-server',
			'./src/client.js'
		],
		reactLibrary: [
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'react-router-dom'
		],
		vendor: [
			'superagent'
		]
	},
	output: {
		path: path.resolve(projectRootPath, 'dist'),
		filename: '[name].min.js',
		chunkFilename: '[name].min.js',
		publicPath: `http://${HOST}:${PORT}/dist/`
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json', 'css', 'scss', 'png', 'jpg', 'jpeg'],
		alias: {
			'react': path.resolve(__dirname, '../node_modules/react'),
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'reactLibrary', 'vendor', 'manifest'],
			// filename: '[name].[hash].min.js',
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEV__: true,
			__PROD__: true,
			__DEVTOOLS__: true
		})
	]
};

module.exports = config;
