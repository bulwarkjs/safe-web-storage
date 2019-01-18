var path = require('path')

module.exports = {
  mode: 'none',
  entry: './build/index.js',
  output: {
    filename: 'safestorage.js',
    path: path.resolve(__dirname, 'build', 'dist'),
    library: 'safestorage',
    globalObject: 'this',
    libraryTarget: 'umd'
  }
}
