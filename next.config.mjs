/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengaktifkan fitur React Strict Mode untuk coding yang lebih bersih
  reactStrictMode: true,

  // Izinkan Next.js menampilkan gambar dari domain eksternal
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.google.com', // Mengizinkan gambar dari server Google
      },
      {
        protocol: 'data', // Mengizinkan gambar dalam format Base64 (inlineData)
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
