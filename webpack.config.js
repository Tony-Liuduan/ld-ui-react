var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name]-[hash].js'
	},
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'autoprefixer-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader'],
			},
			{
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
            favicon:'./src/imgs/icons/favicon.ico',
            template: './public/index.html',
            filename: './index.html',
            chunks: ['index'],
            inject: 'body'
        })
	],
    // contentBase 属性是虚拟路径，启动编译生成index.html,index.js 文件服务的虚拟根目录，
    // 若没有设置代理，指向html文件根目录
    devServer: {
        contentBase: './public', 
        hot: true,
        inline: true,
        port: 8089,
        host: '127.0.0.1',
        historyApiFallback: true,
        open: true,
        noInfo: false,
        proxy: {
            '*': {
                target: 'http://127.0.0.1:8050',
                secure: false
            }
        }
    },
};
