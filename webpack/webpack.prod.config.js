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
		filename: '[name].[hash].min.js',
		chunkFilename: '[name].[hash].min.js',
		publicPath: '/dist/'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json', 'css', 'scss', 'png', 'jpg', 'jpeg'],
		alias: {
			'react': path.resolve(__dirname, '../node_modules/react/dist/react.min.js'),
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom/dist/react-dom.min.js')
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			comments: false
		}),
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
			__DEV__: false,
			__PROD__: true,
			__DEVTOOLS: false
		})
	]
};

module.exports = config;


