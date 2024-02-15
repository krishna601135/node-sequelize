const path = require('path');
const webpack = require('webpack');
var Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = env => {
    console.log(env, "782482")
    return {
        mode: env.development ? "development" : "production",

        target: 'node',
        externals: [nodeExternals()],

        devtool: 'inline-source-map',

        // This forces webpack not to compile TypeScript for one time, but to stay running, 
        // watch for file changes in project directory and re-compile if needed
        watch: env.development === 'development',

        entry: './src/app.ts',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.bundle.js',
        },

        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },

        plugins: env.development ? [
            new Dotenv({
                path: path.resolve(__dirname, './.env'),
                systemvars: true
            }),
            new NodemonPlugin()
        ] : [
            new Dotenv({
                path: path.resolve(__dirname, './.env'),
                systemvars: true
            })
        ]
        
    }
}