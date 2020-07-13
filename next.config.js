const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  poweredByHeader: false,
  target: 'serverless',
});
