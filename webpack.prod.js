var path = require('path'),
  webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ],
  entry: [
    './public/js/index'
  ],
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, './public/js')
        // },
        // { test: /\.css$/, loader: 'style-loader!css-loader' },
        // { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        // {
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     loaders: [
        //       'file?hash=sha512&digest=hex&name=[hash].[ext]',
        //       'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        //     ]
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
