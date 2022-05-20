const { plugins } = require('../craco.config');
const { overrideWebpackConfig } = require('craco-less');
const { loadCracoConfig } = require('@craco/craco/lib/config');
const { getCraPaths } = require('@craco/craco/lib/cra');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (webpackConfig, { configType }) => {
    const context = {env: process.env.NODE_ENV};
    const cracoConfig = loadCracoConfig(context);
    context.paths = getCraPaths(cracoConfig);
    overrideWebpackConfig({
      context,
      webpackConfig,
      pluginOptions: {
        lessLoaderOptions: plugins[0].options.lessLoaderOptions
      },
    });

    return webpackConfig;
  },
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
};