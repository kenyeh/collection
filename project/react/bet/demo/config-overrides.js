const {
  injectBabelPlugin,
  getLoader,
} = require('react-app-rewired');

const fileLoaderMatcher = function (rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
}

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    style: true,
  }], config);

  // customize theme
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        {
          loader: require.resolve('postcss-loader'),
          // options: {
          //   // Necessary for external CSS imports to work
          //   // https://github.com/facebookincubator/create-react-app/issues/2677
          //   ident: 'postcss',
          //     config: {
          //       path: './postcss.config.js',
          //     },
          // },
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            javascriptEnabled: true,
            // theme vars, also can use theme.js instead of this.
            modifyVars: {
              "@hd": "2px",
            },
          },
        },
      ]
    }
  );

  // css-modules
  config.module.rules[1].oneOf.unshift(
    {
      test: /\.css$/,
      exclude: /node_modules|antd-mobile\.css/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            // modules: true,
            importLoaders: 1,
            // localIdentName: '[local]___[hash:base64:3]'
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          // options: {
          //   // Necessary for external CSS imports to work
          //   // https://github.com/facebookincubator/create-react-app/issues/2677
          //   ident: 'postcss',
          //   config: {
          //     path: './postcss.config.js',
          //   },
          // },
        },
      ]
    }
  );

  // file-loader exclude
  let l = getLoader(config.module.rules, fileLoaderMatcher);
  l.exclude.push(/\.less$/);
  
  return config;
};
