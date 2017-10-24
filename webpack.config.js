const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  
  entry: "./js/main.js",
  output: {
    path: __dirname + "/js",
    filename: "../public/bundle.js"
  },
  
  module: {
    loaders: [{ 
	  test: /\.css$/, 
	  loader: "css/style!css" 
    }]
  },
};