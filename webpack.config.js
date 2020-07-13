const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    //входной файл
    entry: {
        app: './src/js/index.js'
    },
    //выходной файл
    output: {
        filename: '[name].js',
        //точка выхода
        path: path.resolve(__dirname, './dist'),
        //для devserver'a
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },{
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }
                ]
            }
        ]
    },
    devServer: {
        //показ ошибок на экране бразуера
        overlay:true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WriteFilePlugin(),
    ],
};