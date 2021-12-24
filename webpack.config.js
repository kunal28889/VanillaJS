const path = require("path");
module.exports = {
  entry: "src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            Presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        Test: /\.css$/,
        Use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    Port: 9000
  }
};
