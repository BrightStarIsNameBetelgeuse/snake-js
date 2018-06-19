import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8081';

const isDev = Boolean(process.env.NODE_ENV === 'development');

const config = {
    entry: {
        bundle: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
    },
    devtool: isDev ? 'source-map' : 'nosources-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: isDev ? './js/[name].js' : './js/[name]-[hash:8].js',
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
    },
    watch: isDev,
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: 'babel-loader?cacheDirectory=true',
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        minimize: !isDev,
                    },
                }],
                exclude: ['node_modules'],
            },
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        }),
        // new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            },
        }),
        new ManifestPlugin({
            fileName: 'build-manifest.json',
        }),
    ],
    devServer: {
        contentBase: './public',
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
    },
};

export default config;
