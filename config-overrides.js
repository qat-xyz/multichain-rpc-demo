const { ProvidePlugin } = require("webpack");

module.exports = config => {
  config.resolve.fallback = Object.assign(config.resolve.fallback || {}, {
    fs: false,
    "fs/promises": false,
    "node-fetch": false,
  });
  config.plugins = [
    ...config.plugins,
    new ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
  ];
  // ignore source map warnings
  config.ignoreWarnings = [/Module Warning \(from /];
  return config;
};
