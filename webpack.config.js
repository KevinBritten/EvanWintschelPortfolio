const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
];

class RunBeforeCompile {
    apply(compiler) {
        //make image list file in dist folder
        compiler.hooks.beforeRun.tap('Make Image List', function() {
            const folderDirents = fse.readdirSync('./app/assets/images/albums', { withFileTypes: true });
            const folders = folderDirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
            const images = {};
            folders.forEach((folder, index) => {
                images[index] = fse
                    .readdirSync(`./app/assets/images/albums/${folder}`)
                    .filter((image) => !image.includes('.DS_Store'));
            });
            fse.writeFileSync(
                './app/assets/scripts/modules/ImageList.js',
                `class ImageList{
						constructor(){
					this.list = ${JSON.stringify(images)}     }
				}
				export default ImageList`
            );
        });
    }
}
class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy Images', function() {
            fse.copySync('./app/assets/images', './dist/assets/images'); //copy image directory to dist
        });
    }
}

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }]
};

let config = {
    entry: ['babel-polyfill', './app/assets/scripts/app.js'],
    plugins: [
        new RunBeforeCompile(),
        new webpack.ProgressPlugin(),
        new workboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html'
        })
    ],
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
                test: /.(js|jsx)$/,
                include: [path.resolve(__dirname, 'app/assets/scripts')],
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
            {
                test: /\.png$/,
                include: [path.resolve(__dirname, 'app/assets/images/bg-images')],
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            cssConfig
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    }
};

if (currentTask === 'dev') {
    cssConfig.use.unshift('style-loader');
    config.mode = 'development';
    config.devServer = {
        before: function(app, server) {
            server._watch('./app/*.html');
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    };
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    };
}

if (currentTask === 'build') {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    config.mode = 'production';
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    };
    config.optimization.splitChunks = { chunks: 'all' };
    config.plugins.unshift(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
        new RunAfterCompile()
    );
}

module.exports = config;