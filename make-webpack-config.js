/* eslint no-var: 0 , babel/object-shorthand: 0*/

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJson = require('./package.json');

module.exports = function(options) {
  options = options || {};
  options.host = options.host || '127.0.0.1';
  options.port = options.port || 3000;

  var entry = {
    main: './src/scripts/app.js'
  };

  var output = {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: options.hotComponents ? '/' : './'
  };

  var plugins = [
    new webpack.BannerPlugin(packageJson.name + ' v' + packageJson.version),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  if (!options.hotComponents) {
    plugins.push(new ExtractTextPlugin('bundle.css'));
  }

  if (options.additionalPlugins) {
    plugins = plugins.concat(options.additionalPlugins);
  }

  var asyncLoaders = options.hotComponents ? [
    'react-hot-loader',
    'babel-loader'
  ] : ['babel-loader'];

  var cssLoader = {
    test: /\.css$/
  };
  var scssLoader = {
    test: /\.scss$/
  };
  var sassLoader = {
    test: /\.sass$/
  };
  var lessLoader = {
    test: /\.less$/
  };
  if (options.hotComponents) {
    cssLoader.loader = 'style!css';
    scssLoader.loader = 'style!css!sass';
    sassLoader.loader = 'style!css!sass?indentedSyntax';
    lessLoader.loader = 'style!css!less';
  } else {
    var extractTextPluginoptions = {publicPath: './'};
    cssLoader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader', extractTextPluginoptions);
    scssLoader.loader = ExtractTextPlugin.extract('css!autoprefixer-loader!sass', extractTextPluginoptions);
    sassLoader.loader = ExtractTextPlugin.extract('css!autoprefixer-loader!sass?indentedSyntax', extractTextPluginoptions);
    lessLoader.loader = ExtractTextPlugin.extract('css!autoprefixer-loader!less', extractTextPluginoptions);
  }

  var loaders = [
      {
        test: /\.jsx?$/,
        loaders: asyncLoaders,
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loaders: asyncLoaders,
        include: options.loaderJsxInclude || []
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|wav|mp3|html)$/,
        include: [path.join(__dirname, 'src/static')],
        loader: 'file?name=[name].[ext]'
      },
      cssLoader,
      scssLoader,
      sassLoader,
      lessLoader,
      {
        test: /\.(otf|woff|ttf|eot|svg)(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000'
      }
    ];

  var extensions = ['', '.js', '.jsx', '.json'];

  return {
    entry: entry,
    output: output,
    devtool: options.devtool,
    debug: options.debug,
    module: {
      loaders: loaders
    },
    resolve: {
      extensions: extensions
    },
    plugins: plugins,
    devServer: {
      contentBase: './src/static',
      hot: options.hotComponents,
      host: options.host,
      port: options.port
    }
  };
};
