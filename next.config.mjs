/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // env: {
  //   customKey: "my-value",
  // },
  env: {
    ENCODER_KEY: process.env.ENCODER_KEY,
    CONNECT_STR: process.env.CONNECT_STR,
  },
};

export default nextConfig;
