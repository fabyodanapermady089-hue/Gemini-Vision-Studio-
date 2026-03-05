/** @type {import('next').Metadata} */
const nextConfig = {
  images: {
    // Kita hapus remotePatterns karena Gemini mengirim gambar dalam format Base64
    // format Base64 (data:image/...) diizinkan secara default oleh Next.js
    unoptimized: true, 
  },
};

export default nextConfig;
