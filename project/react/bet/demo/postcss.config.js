
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-pxtorem')({
      rootValue: 85,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      selectorBlackList: [],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    }),
    cssnext({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
    cssnano({
      autoprefixer: false,
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }]
    }),
  ]
};
