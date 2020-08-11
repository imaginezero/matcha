const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  poweredByHeader: false,
  target: 'serverless',
});
