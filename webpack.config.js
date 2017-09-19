module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "./output/index.js"
	},
	module:{
		loaders:[
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: [
						"es2015",
						"react"
					]
				}
			}
		]
	}
}