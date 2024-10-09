/** @type {import('next').NextConfig} */

const nextConfig =  {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'darkdes-django-t3b02.tw1.ru',
        port: '',
        pathname: '/media/media/**',
      },
    ],
  },

}

export default nextConfig
