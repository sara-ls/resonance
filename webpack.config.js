const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|mp3|ico)$/,
        loader: "file-loader",
      },
    ],
  },
};
