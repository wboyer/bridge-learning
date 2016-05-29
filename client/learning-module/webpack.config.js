module.exports = {
	entry: './entry.js',
	output: {
		filename: 'bundle.js',
		libraryTarget: "var",
		library: "LearningModule"
	},
	module: {
		loaders: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}]
	},
	externals: {
		react: "React",
		numeral: "numeral"
	}
}