const path = require("path");
// const glob = require("glob");
// const PurgecssPlugin = require("purgecss-webpack-plugin");

// const PATHS = {
//   src: path.join(__dirname, "src"),
// };

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
  // plugins: [
  //   new PurgecssPlugin({
  //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  //   }),
  // ],
};
