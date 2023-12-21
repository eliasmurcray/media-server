const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("node:fs");

const basenames = fs
	.readdirSync(path.resolve(__dirname, "src/chunks"))
	.filter((file) => path.extname(file).toLowerCase() === ".tsx")
	.map((file) => file.substring(0, file.length - 4));

const entries = {};
const htmlPlugins = [];

basenames.forEach((name) => {
	entries[name] = `./src/chunks/${name}.tsx`;
	htmlPlugins.push(
		new HtmlWebpackPlugin({
			template: `./src/html/${name}.html`,
			filename: name + ".html",
			chunks: [name],
		}),
	);
});

module.exports = {
	mode: "development",
	entry: entries,
	output: {
		publicPath: "",
		path: path.resolve(__dirname, "public"),
		filename: "[name].[contenthash].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		port: 5001,
	},
	resolve: {
		extensions: [".tsx", ".js"],
	},
	optimization: {
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		...htmlPlugins,
	],
};
