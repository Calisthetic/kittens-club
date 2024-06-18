module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'kittens-club.vercel.app',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
  transpilePackages: ['next-auth'],
}