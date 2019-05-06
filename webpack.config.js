// 一个常见的`webpack`配置文件

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    mode:'development',
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",
        filename: "bundle-[hash].js"
    },
    devServer: {
        contentBase: "../threejs",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
      },
      module:{
          rules:[
              {
                test: /\.js$/,
                use:{
                    loader:'babel-loader',
                },
                exclude: /node_modules/
              },
              {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                     {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
          ]
      },
      plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
    ],
};
