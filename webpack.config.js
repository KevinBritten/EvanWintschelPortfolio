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
        //make image list file in home folder
        compiler.hooks.beforeRun.tap('Make Image List', function() {
            const folderDirents = fse.readdirSync('./app/assets/images/albums', { withFileTypes: true });
            const folders = folderDirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
            const images = {};
            let albumListHtml = '';
            folders.forEach((folder) => {
                images[folder] = fse
                    .readdirSync(`./app/assets/images/albums/${folder}`)
                    .filter((image) => !(image.includes('.DS_Store') || image.includes('thumbnails')));
                albumListHtml += `<li class="content-area__album">${folder}</li>`;
            });
            fse.writeFileSync(
                './app/assets/scripts/modules/ImageList.js',
                `class ImageList{
						constructor(){
					this.list = ${JSON.stringify(images)}     }
				}
				export default ImageList`
            );

            fse.writeFileSync('./app/html-modules/_album-list.ejs', albumListHtml);
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
            template: './app/index.ejs'
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
                test: /\.(jpe?g|png)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            cssConfig,
            { test: /\.ejs$/, use: 'ejs-compiled-loader' }
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
            server._watch('./app/*.ejs');
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
        path: path.resolve(__dirname, 'gh-pages', 'home')
    };
    config.optimization.splitChunks = { chunks: 'all' };
    config.plugins.unshift(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }));
}

module.exports = config;