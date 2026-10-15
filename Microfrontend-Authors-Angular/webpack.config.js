const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-authors',
  filename: 'remoteEntry.js',
  exposes: {
    './AuthorsPage': './src/app/presentation/pages/authors/authors.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
