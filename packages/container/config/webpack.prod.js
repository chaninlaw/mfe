const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodCofig = {
  mode: 'production',
  output: {
    // for caching issues
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // looking remoteEntry with the name of marketing assuming inside /marketing
        // and using the url of the domain for production
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// prodConfig is merged or Override commonConfig
module.exports = merge(commonConfig, prodCofig);
