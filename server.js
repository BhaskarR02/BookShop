var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
console.log(WebpackDevServer);
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.path,
	hot: true,
	historyApiFallback: true
}).listen(1337, 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}

	console.log('Listening at localhost:1337');
});
