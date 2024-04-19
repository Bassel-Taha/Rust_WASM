const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const wasmToolPlugIn = require('@wasm-tool/wasm-pack-plugin');
const { experiments } = require('webpack');
module.exports = {
  entry: './public/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin(
        {
            template: './public/index.html'
        }
    ),

    // wasmTool is used so that webpack can compile rust code
    //todo must add the wasmToolPlugIn in the cargo.toml in the [lib] section so that rust know to create a creat with suport for extrnal languages
    new wasmToolPlugIn({
      crateDirectory : path(__dirname , ".")
    }) 
],
//todo must add the experiment features in the webpack.config.js file to enable rust compilation feature as its an experimental feature in webpack
// and to enable the higher level async features
experiments: {
 asyncWebAssembly: true
}
};