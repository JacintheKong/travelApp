const path=require('path');
const webpack=require('webpack');
const HtmlWebPackPlugin=require("html-webpack-plugin");
const TerserPlugin=require('terser-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const WorkboxPlugin=require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var', 
        library: 'Client', 
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.min.js'
    }
    ,
    mode: 'production',
    optimization: {
        minimizer: [
        new TerserPlugin( {} ),
        new OptimizeCSSAssetsPlugin( {})],
    }
    ,
    module: {
        rules: [ {
            test: '/\.js$/', 
            exclude: /node_modules/, 
            loader: "babel-loader"
        },
        {
            test: /\.scss$/, 
            use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
            test: /\.html$/,
            loader: "html-loader",
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: "file-loader",
          },
        ]
    }
    ,
    plugins: [ 
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new CleanWebpackPlugin( {
            dry: true, 
            verbose: true, 
            cleanStaleWebpackAssets: true, 
            protectWebpackAssets: false
        }),
        new HtmlWebPackPlugin( {
            template: "./src/client/views/index.html", 
            filename: "./index.html",
        }
        ),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }), 
    ]
}