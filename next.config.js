/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    loader: "akamai",
    path: "/assets",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });

    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

module.exports = nextConfig;
