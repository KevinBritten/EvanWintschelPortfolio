const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

let cssConfig = {
	test: /\.css$/i,
	use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins }}]
}

module.exports = {
	mode: 'development',
	entry: './app/assets/scripts/app.js',
	output: {
		publicPath: ''
	},
	// "externals": {
	// 	"fs": "require('fs')",
	//  },
	devServer: {
        before: function(app, server){
            server._watch('./app/*.html');
          },
        contentBase: path.join(__dirname, "app"),
        hot: true,
        port: 3000,
        host: '0.0.0.0'},
	plugins: [
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
		new workboxPlugin.GenerateSW({
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: false
		})
	],
	// node: {
	// 	fs: "empty"
	// },



	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'app/assets/scripts')],
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{ 
				test: /\.png$/,
				include: [path.resolve(__dirname, 'app/assets/images/bg-images')],
				use: [
					{
					loader: 'url-loader',
					options: {
						name: '[name].[ext]'
					}
					}
				]
			},
			cssConfig
			]
	},

	optimization: {
		minimizer: [new TerserPlugin()],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	}
};
