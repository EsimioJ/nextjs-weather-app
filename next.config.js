/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.openweathermap.org",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.mapbox.com",
        port: "",
        pathname: "**",
      },
    ],
  },
}

module.exports = nextConfig
