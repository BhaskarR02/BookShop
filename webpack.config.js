var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports ={
  context: __dirname,
  devtool :debug ? "inline-sourcemap":null,
  entry:[
    //"webpack-dev-server/client?http://localhost:1337",
    //"webpack/hot/dev-server",
     "./js/main.js"
     ],
  output:{
  path:__dirname +"/public",
  filename:"main.min.js"
},
devtool:'source-map',
module:{
  loaders:[
    { test :/\.css$/,
      loader:'style!css!'
    }
  ]
},
plugins: debug ? [
 new webpack.ProvidePlugin({
  $:"jquery",
  jQuery:"jquery",
  "window.jQuery":"jquery"
 })
] : [
 new webpack.optimize.DedupePlugin(),
 new webpack.HotModuleReplacementPlugin(),
 new webpack.NoErrorsPlugin(),
 new webpack.optimize.OccurenceOrderPlugin(),
 new webpack.optimize.UglifyJsPlugin({mangle:false,sourcemap:false}),
 new ngAnnotatePlugin({add:true}),
 new webpack.ProvidePlugin({
  $:"jquery",
  jQuery:"jquery",
  "window.jQuery":"jquery"
 })
],
};

