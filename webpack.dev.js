const path=require('path');
const webpack=require('webpack');
const HtmlWebPackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require('clean-webpack-plugin'); 
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports= {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var', 
        library: 'Client',
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
        }
        ]
    },
    plugins: [ 
        new BundleAnalyzerPlugin( {
            analyzerMode: 'server', 
            generateStatsFile: true, 
            statsOptions: {
                source: false
            }
        }
        ),
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
    ]
}