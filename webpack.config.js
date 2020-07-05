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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
