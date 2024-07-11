const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TemplateEjsLoader = require('template-ejs-loader');

module.exports = {
  entry: './app.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/, // Match EJS files
        use: [
          'html-loader', 'template-ejs-loader' // Convert EJS to HTML
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/layouts/boilerplate.ejs', // Path to your EJS template
      filename: 'boilerplate.html', // Output filename
    }),
  ],
};
