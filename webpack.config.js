const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin から　CleanWebpackPluginのクラスのみ使用する
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js/,
        // /node_modules/配下は除外する
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // 0.25%以上シェアを持っていて、サポートの終了していないブラウザを対象とする
                ['@babel/preset-env', { "targets": "> 0.25%, not dead" }],
                '@babel/preset-react'
              ],
            }
          }
        ]
      },
      {
        // testでファイル名の検知を行う、.css、sass、scssファイルを検知
        test: /\.(css|sass|scss)/,
        use: [
          // 読み込んだモジュールをMiniCssExtractPluginで処理する
          {
            loader: MiniCssExtractPlugin.loader
          },
          // .cssファイルにはcss-loaderを使用し読み込む
          {
            loader: 'css-loader',
            options: {
              // ソースマップを出力する（trueで）
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader'
          }
        ] 
      },
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'images/[name].[ext]',
              publicPath: '/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              }
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
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html'
    }),
    new CleanWebpackPlugin()
  ]
}