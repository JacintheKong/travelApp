const path=require('path');
const webpack=require('webpack');
const HtmlWebPackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require('clean-webpack-plugin'); 
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin=require('workbox-webpack-plugin');

module.exports= {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var', 
        library: 'Client',
        path: path.resolve(__dirname, 'dist'), 
        filename: 'bundle.min.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [ {
            test: '/\.js$/', 
            exclude: /node_modules/, 
            loader: "babel-loader"
        },
        {
            test: /\.scss$/, 
            use: [ 'style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"],
        },
        {
            test: /\.html$/,
            loader: "html-loader",
          },
        ]
    },
    plugins: [ 
        new BundleAnalyzerPlugin(),
        new HtmlWebPackPlugin( {
            template: "./src/client/views/index.html", 
            filename: "./index.html",
        }
        ),
        new CleanWebpackPlugin( {
            dry: true, 
            verbose: true, 
            cleanStaleWebpackAssets: true, 
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }), 
    ]
}