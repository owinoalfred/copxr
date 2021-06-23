module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	plugins: ["json"],
	extends: [
		'eslint:recommended',
		'plugin:json/recommended',
		'plugin:vue/essential'
	],
	rules: {
		'no-alert': 'error',
		'no-eval': 'error',
	},
	env: {
		browser: true,
		es6: true,
		jquery: true,
		node: true,
		jasmine: true,
		jest: true,
	},
};
