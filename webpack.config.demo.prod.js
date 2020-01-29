const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: ["./demo/index.js"],
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "livedemo"),
    publicPath: resolve(__dirname)
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss", ".json"]
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
        use: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.eot|\.ttf|\.svg|\.woff2?/,
        use: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ]
};
