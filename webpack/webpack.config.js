const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
	module.exports = require('./webpack.prod.config.js');
} else {
	module.exports = require('./webpack.dev.config.js');
}
