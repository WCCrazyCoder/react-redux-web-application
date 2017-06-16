var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
			'redux-thunk',
			'react-redux',
			'react-router-dom',
			'react-router-redux'
		],
		vendor: [
			'superagent'
		]
	},
	output: {
		path: path.resolve(projectRootPath, 'dist'),
		filename: '[name].min.js',
		chunkFilename: '[name].min.js',
		publicPath: `http://${HOST}:${PORT}/`
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' }
				]
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
					{ loader: 'style-loader' }, 
					{ loader: 'css-loader?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]' }, 
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
		}, {
			test: /\.(png|jpg|gif)$/,
			exclude: /node_modules/,
			use: [{ loader: 'url-loader', options: { limit: 8192 }}]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx', 'json'],
		alias: {
			'react': path.resolve(__dirname, '../node_modules/react'),
			'react-dom': path.resolve(__dirname, '../node_modules/react-dom')
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'reactLibrary', 'vendor', 'manifest'],
			// filename: '[name].[hash].min.js',
			minChunks: Infinity
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			},
			__CLIENT__: true,
			__SERVER__: false,
			__DEV__: true,
			__PROD__: false,
			__DEVTOOLS__: true
		})
	]
};

module.exports = config;
