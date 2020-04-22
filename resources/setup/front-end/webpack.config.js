const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
        watch: false,
        mode: 'development',
        entry: './src/main.js',
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }]
        }
        module.exports = {
            devtool: 'cheap-module-eval-source-map',

        };