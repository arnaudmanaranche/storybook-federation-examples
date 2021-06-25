const path = require('path');

const glob = require('glob');
const webpack = require('webpack');

const returnPaths = (globs = [], storiesExtension = /\.?stories\./) => {
  return globs
    .reduce((previousValue, currentValue) => {
      return [...previousValue, ...glob.sync(currentValue)];
    }, [])
    .filter((p) => !new RegExp(storiesExtension).test(p));
};

const prepareExposesObject = (paths, removePrefix = './src/components/') => {
  return paths.length > 0
    ? paths.reduce(
        (previousValue, currentValue) => {
          const extension = path.extname(currentValue);

          return {
            exposes: {
              ...previousValue.exposes,
              [currentValue
                .replace(removePrefix, './')
                .replace(extension, '')
                .replace(/\/index$/, '')]: currentValue
            }
          };
        },
        { exposes: {} }
      )
    : {};
};

const returnShared = (extraToShare = []) => {
  return [...new Set(['react', ...extraToShare])];
};

const returnRemotes = (remotes) =>
  remotes.reduce((prev, curr) => {
    return { ...prev, [curr]: curr };
  }, {});

const prepareRemotesObject = (remotes) =>
  remotes.length > 0 ? { remotes: returnRemotes(remotes) } : {};

const returnStorybookConfig = ({ files = {}, remotes = [], shared }) => ({
  name: 'storybookRemote',
  filename: 'remote-entry.js',
  shared: returnShared(shared),
  ...prepareExposesObject(
    returnPaths(
      Array.isArray(files) ? files : files.paths,
      files.storiesExtension
    ),
    files.removePrefix
  ),
  ...prepareRemotesObject(remotes)
});

class WebpackFederationPlugin {
  constructor(options) {
    return new webpack.container.ModuleFederationPlugin(
      returnStorybookConfig(options)
    );
  }
}

module.exports = WebpackFederationPlugin;
