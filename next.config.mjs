/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.marblecms.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
