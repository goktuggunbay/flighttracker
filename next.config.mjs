/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    OPENSKY_USERNAME: process.env.OPENSKY_USERNAME,
    OPENSKY_PASSWORD: process.env.OPENSKY_PASSWORD,
  },
};

export default nextConfig;
