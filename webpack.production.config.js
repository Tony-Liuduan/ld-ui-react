var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
	entry: {
		index: './src/index.js',
        vendors: ['react','react-dom','react-redux','react-router'] // 分离第三方应用
	},
	output: {
		path: path.join(__dirname, 'build'), // 输出文件夹地址
        publicPath: '/', // 项目开发改为cdn地址
        chunkFilename: "[name]-[chunkhash:8]-chunk.js", // 实现react按需加载
        filename: '[name]-[hash].js', // 输出文件名
	},
    resolve: {
        extensions: [".js", ".jsx", ".json"] 
    },
    // 如果 .html 文件配置cdn地址引用, 则引用下面配置, 删除vanders配置
    /*externals: {
        "react": 'React',
        "react-dom": 'ReactDOM',
        "react-router": 'ReactRouter',
        "redux": 'Redux',
        "react-redux": 'ReactRedux'
    },*/
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: 'css-loader!autoprefixer-loader'
                })
			},
			{
				test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: 'css-loader!autoprefixer-loader!sass-loader'
                })
				//use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader'],
			},
			{
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=8192&name=imgs/[name].[ext]' //8192bit == 1kb
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader?limit=8192&name=fonts/[name].[ext]'
            }
		]
	},
	plugins: [
        // 构建前删除上一个构建文件夹
        new CleanPlugin(['./build']),
        // 分离第三方应用
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors-[hash].js'
        }),
        // 提取入口文件公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common-[hash].js'
        }),
        new ExtractTextPlugin("app.css"),
        // 自动构建 .html 文件
		new HtmlWebpackPlugin({
            favicon:'./src/imgs/icons/favicon.ico',
            template: './public/index.html',
            filename: './index.html',
            chunks: ['vendors', 'common', 'index'],
            inject: 'body',
            // 压缩html文件
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }), 
        // 定义生产环境, 优化代码压缩
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // 压缩混淆js代码
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false
            }
        })
	],
};
