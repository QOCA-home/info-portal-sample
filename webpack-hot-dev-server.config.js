/* eslint no-var: 0 , babel/object-shorthand: 0*/

var webpack = require('webpack');
var makeWebpackConfig = require('./make-webpack-config');

var config = makeWebpackConfig({
  devtool: 'eval',
  hotComponents: true,
  additionalPlugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        bootstrap: 'bootstrap-sass'
    })
  ],
  loaderJsxInclude: []
});

module.exports = config;
