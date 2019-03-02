const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const { NODE_ENV: env } = process.env

const webpackConfig = {
  mode: env,
  context: __dirname + "/src",
  entry: ["@babel/polyfill", "./"],

  output: {
    publicPath: "/build/",
    path: __dirname + "/build",
    filename: "[name]-[hash].js",
    chunkFilename: "[chunkhash]-[id].js",
    library: "[name]"
  },

  devtool: env == "development" && "source-map",

  devServer: {
    host: "0.0.0.0",
    hot: true,
    open: true,
    contentBase: "/build/",
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: "/build/index.html" }
      ]
    }
  },

  resolve: {
    modules: ["./src", "./src/components/Common", "node_modules"],
    extensions: [".js", ".json"]
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: { emitWarning: true }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
      PropTypes: "prop-types"
    }),

    new webpack.DefinePlugin({
      "__ENV__": JSON.stringify(env)
    }),

    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerPort: 8081,
      logLevel: "error"
    }),

    new HtmlWebpackPlugin({
      favicon: "../favicon.ico",
      template: "../index.html"
    })
  ]
}

// If mode is development
if (env == "development") {
  webpackConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

// If mode is production
if (env == "production") {
  webpackConfig.plugins.push(
    new CleanWebpackPlugin([__dirname + "/build/"])
  )
}

module.exports = webpackConfig
