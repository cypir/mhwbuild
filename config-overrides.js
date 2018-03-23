const path = require("path");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.module.rules.push({
    test: /\.worker\.(js|jsx|mjs)$/,
    include: path.resolve("src"),
    use: [
      require.resolve("worker-loader"),
      {
        loader: require.resolve("babel-loader"),
        options: {
          // @remove-on-eject-begin
          babelrc: false,
          presets: [require.resolve("babel-preset-react-app")],
          // @remove-on-eject-end
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          highlightCode: true
        }
      }
    ]
  });
  return config;
};
