module.exports = {
  plugins: [
    [
      'babel-plugin-formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
  ],
};
