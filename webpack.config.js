var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    // 配置页面入口js文件
    entry: {
        index: './src/index.js'
    },
    // 配置打包输出相关
    output: {
        // 入口js的打包输出文件名
        filename: '[name]-[hash].js'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        /*配置各种类型文件的加载器, 称之为loader，webpack当遇到import ... 时, 会调用这里配置的loader对引用的文件进行编译*/
        rules: [
            {
                /*使用babel编译ES6/ES7/ES8为ES5代码，使用正则表达式匹配后缀名为.js的文件*/
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/, // 排除node_modules目录下的文件, npm安装的包不需要编译
                /*use指定该文件的loader, 值可以是字符串或者数组。可先使用eslint-loader处理, 返回的结果交给babel-loader处理. loader的处理顺序是从最后一个到第一个.
	   				eslint-loader用来检查代码, 如果有错误, 编译的时候会报错。babel-loader用来编译js文件.*/
                use: 'babel-loader' // use: ['babel-loader', 'eslint-loader']
            }, {
                // 匹配.html文件
                test: /\.html$/,
                /*使用html-loader, 将html内容存为js字符串, 比如当遇到 import htmlString from './template.html' template.html的文件内容会被转成一个js字符串, 合并到js文件里.*/
                //use: 'html-loader'
            }, {
                // 匹配.css文件
                test: /\.css$/,
                /*先使用css-loader处理, 返回的结果交给style-loader处理. css-loader将css内容存为js字符串, 并且会把background, @font-face等引用的图片,字体文件交给指定的loader打包.*/
                use: ['style-loader', 'css-loader', 'autoprefixer-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
            }, {
                /*匹配各种格式的图片和字体文件,上面html-loader会把html中<img>标签的图片解析出来, 文件名匹配到这里的test的正则表达式,css-loader引用的图片和字体同样会匹配到这里的test条件*/
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    /*配置webpack插件，plugin和loader的区别是, loader是在import时根据不同的文件名, 匹配不同的loader对这个文件做处理，而plugin, 关注的不是文件的格式, 而是在编译的各个阶段, 会触发不同的事件, 让你可以干预每个编译阶段.*/
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*
            html-webpack-plugin用来打包入口html文件，entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
            但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,所以, 我们需要html-webpack-plugin来打包作为入口的html文件
        */

        /*
            template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
            webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
            html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
            可以通过filename参数指定输出的文件名
            html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
        */
        new HtmlWebpackPlugin({favicon: './src/imgs/icons/favicon.ico', template: './public/index.html', filename: './index.html', chunks: ['index'], inject: 'body'}),
        new OpenBrowserPlugin({url: 'http://localhost:8089/'})
    ],
    // contentBase 属性是虚拟路径，启动编译生成index.html,index.js 文件服务的虚拟根目录，
    // 若没有设置代理，指向html文件根目录
    devServer: {
        contentBase: __dirname + '/public',
        hot: true,
        inline: true,
        port: 8089,
        host: '127.0.0.1',
        /*
            historyApiFallback用来配置页面的重定向
            SPA的入口是一个统一的html文件, 比如http://localhost:8010/foo
            我们要返回给它 http://localhost:8010/index.html这个文件
            配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
        */
        historyApiFallback: true,
        noInfo: false,
        proxy: {
            '*': {
                target: 'http://127.0.0.1:8050',
                secure: false
            }
        }
    }
};
