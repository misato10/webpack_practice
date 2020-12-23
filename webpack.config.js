const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin から　CleanWebpackPluginのクラスのみ使用する
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/javascripts/main.js',
  //ファイルの出力場所 
  // ※出力場所は絶対パスで指定する必要がある
  output:　{
    // path.resolve(__dirname,で絶対パスを指定することができる
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/main.js'
  },
  module: {
    rules: [
      {
        // testでファイル名の検知を行う、.cssファイルを検知
        test: /\.css/,
        use: [
          // 読み込んだモジュールをMiniCssExtractPluginで処理する
          {
            loader: MiniCssExtractPlugin.loader
          },
          // .cssファイルにはcss-loaderを使用し読み込む
          {
            loader: 'css-loader'
          }
        ] 
      },
      {
        test: /\.(png|jpg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              // コードの圧縮を解除
              pretty: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html'
    }),
    new CleanWebpackPlugin()
  ]
}