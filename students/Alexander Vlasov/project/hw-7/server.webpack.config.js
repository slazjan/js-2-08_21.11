const path = require('path')
const nodeExternals = require('webpack-node-externals')
const cop = require ('copy-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'server', 'server.js')
    },
    output: {
        path: path.join(__dirname, 'dist', 'server'),
        publicPath: '',
        filename: 'server.js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals ()],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new cop ([
            {
                from: 'src/server/db',
                to: 'db/[name].[ext]',
                toType: 'template'
            }
        ])
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({})]
      }
}