const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const { StatsWriterPlugin } = require("webpack-stats-plugin")

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const APP_ENV = process.env.APP_ENV === 'production' ? 'production' : 'development'

const baseConfig = {
	entry: './src/entry.js',
	mode: NODE_ENV,
	devtool: '',
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js',
		// This tells the server bundle to use Node-style exports
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			// Ensures that the ECMAScript module flavor of Vue is imported whenenver used.
			// Thus, in `import Vue from 'vue'`, `vue` is mapped to the path below.
			'vue$': 'vue/dist/vue.esm.js',

			// A simple convenience alias to avoid nasty relative paths.
			// Thus, `../../../components/Foo.vue` might become `@/components/Foo.vue`.
			'@': path.resolve(__dirname, 'src'),
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true,
				},
			},
			{
				test: /\.md$/,
				loader: path.resolve(__dirname, 'src/lib/markdown-layout-loader.js')
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{ loader: 'postcss-loader', options: {} },
				]
			},
			{
				// File loader simply takes a file a puts it somewhere else with (optionally a new name and 
				// cache-busting hash).
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[hash:8].[ext]'
				}
			},
		]
	},
	node: {
		fs: false,
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'css/[name].css?v=[contenthash:8]' }),
		new VueLoaderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(NODE_ENV),
				'APP_ENV': JSON.stringify(APP_ENV),
			}
		}),
	],
}

/**
 * We need this to make the .css file and embed it from the server-side rendered
 * But this won't send any Javascript because the unusedClientBundle is excluded on the server-side
 */
const clientConfigForCSS = merge(baseConfig, {
	entry: './src/css/style.css',
	output: {
		filename: 'unusedClientBundle',
	},
	plugins: [
		// This plugins generates `vue-ssr-client-manifest.json` in the
		// output directory. We need this 
		new VueSSRClientPlugin()
	]
})

/**
 * Creates the vue-ssr-server-manifest that is used to render the templates
 */
const serverConfig = merge(baseConfig, {
	entry: './src/entry.js',
	target: 'node',

	// https://webpack.js.org/configuration/externals/#function
	// https://github.com/liady/webpack-node-externals
	// Externalize app dependencies. This makes the server build much faster
	// and generates a smaller bundle file.
	externals: nodeExternals({
		// do not externalize dependencies that need to be processed by webpack.
		// you can add more file types here e.g. raw *.vue files
		// you should also whitelist deps that modifies `global` (e.g. polyfills)
		whitelist: /\.(css|vue)$/
	}),

	plugins: [
		// This plugins generates `vue-ssr-server-manifest.json` in the
		// output directory.
		new VueSSRServerPlugin()
	]
})

/** The base config for any async-loaded client-side javascript */
const clientAsync = merge.smart(baseConfig, {
	entry: {
		'map-loader': './src/modules/map/map-loader.js',
		'submit-group-form-loader': './src/modules/contact/submit-group-form-loader.js',
		'contact-form-loader': './src/modules/contact/contact-form-loader.js',
		'feedback-form-loader': './src/modules/contact/feedback-form-loader.js',
		'group-selector-loader': './src/modules/groups/group-selector-loader.js',
        'toggle-content': './src/modules/groups/toggle-content.js',
        'video-controls': './src/modules/videos/video-controls.js',
	},
	output: {
		path: path.join(__dirname, 'public/js'),
		publicPath: '/js/',
		filename: '[name].js?v=[hash:8]',
		chunkFilename: 'chunks/[name].js?v=[chunkhash:8]',
		libraryTarget: 'var', // default
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						presets: [['@babel/preset-env', {
							targets: 'defaults, > 0.1%, not dead',
							useBuiltIns: "usage",
							corejs: { version: 3, proposals: true },
						}]],
					}
				}
			},
		]
	},
	plugins: [
		new StatsWriterPlugin({
			filename: "manifest.json",
			stats: {
				all: false,
				assets: false,
				entrypoints: true,
			}
		})
	]
})

const clientAsyncModern = merge.smart(clientAsync, {
	output: {
		path: path.join(__dirname, 'public/js-modern'),
		publicPath: '/js-modern/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory',
					options: {
						presets: [['@babel/preset-env', {
							targets: { "esmodules": true },
							useBuiltIns: "usage",
							corejs: { version: 3, proposals: true },
						}]],
					}
				}
			},
		]
	},
	plugins: [
		new StatsWriterPlugin({
			filename: "manifest.json",
			stats: {
				all: false,
				assets: false,
				entrypoints: true,
			}
		})
	]
})

module.exports = [
	clientConfigForCSS,
	serverConfig,
	clientAsync,
	clientAsyncModern,
]