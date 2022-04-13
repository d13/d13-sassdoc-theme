// `next export` doesn't support i18n: https://github.com/vercel/next.js/issues/18318#issuecomment-719741207
// i18n: {
//   locales: ['en'],
//   defaultLocale: 'en'
// },

module.exports = {
  poweredByHeader: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
