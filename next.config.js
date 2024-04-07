/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.resolve.alias.canvas = false;
    config.resolve.fallback = {
      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,

      fs: false, // the solution
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/cvChanges2',
        destination: 'https://joblys-api-xb4umqr3cq-lz.a.run.app/api/cvChanges2',
      },
    ]
  },
};

module.exports = nextConfig;
