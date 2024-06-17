/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/board/:id",
        destination: "/board", // board.js dosyasına yönlendirir
      },
    ]
  },
}

export default nextConfig
