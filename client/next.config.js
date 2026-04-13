const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        crypto: false, // Fallback crypto
      };

      // Handle "node:" prefixes in modules
      config.plugins.push(
        new NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
    }

    return config;
  },
  compiler: {
    styledComponents: true,
  },
};
