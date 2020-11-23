const path = require('path');

module.exports = {
  entry: './src/index.js',
  //ファイルの出力場所 
  // ※出力場所は絶対パスで指定する必要がある
  output:　{
    // path.resolve(__dirname,で絶対パスを指定することができる
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        // testでファイル名の検知を行う、.cssファイルを検知
        test: /\.css/,
        use: [
          // 読み込んだモジュールをstyle-loaderで処理する
          {
            loader: 'style-loader'
          },
          // .cssファイルにはcss-loaderを使用し読み込む
          {
            loader: 'css-loader'
          }
        ] 
      }
    ]
  }
}