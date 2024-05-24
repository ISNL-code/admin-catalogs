const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            crypto: require.resolve('crypto-browserify'),
            vm: require.resolve('vm-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
        },
        alias: {
            api: path.resolve(__dirname, 'src/api/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            dataBase: path.resolve(__dirname, 'src/dataBase/'),
            helpers: path.resolve(__dirname, 'src/helpers/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            layouts: path.resolve(__dirname, 'src/layouts/'),
            theme: path.resolve(__dirname, 'src/theme/'),
            pages: path.resolve(__dirname, 'src/pages/'),
            App: path.resolve(__dirname, 'src/App/'),
            colors: path.resolve(__dirname, 'src/colors/'),
            types: path.resolve(__dirname, 'src/types/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
};
