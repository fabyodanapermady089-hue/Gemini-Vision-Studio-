import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemini Vision Studio 💎",
  description: "AI Image Generator powered by Nano Banana Technology",
  keywords: ["AI Image", "Gemini AI", "Vision Studio", "Image Generator"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#0f172a] text-white antialiased`}>
        {/* Kamu bisa menambahkan Navbar global di sini jika ingin */}
        <main>
          {children}
        </main>
        
        <footer style={{ 
          textAlign: 'center', 
          padding: '20px', 
          fontSize: '12px', 
          color: '#64748b',
          borderTop: '1px solid #1e293b' 
        }}>
          &copy; {new Date().getFullYear()} Gemini Vision Studio. Built with ❤️ and AI.
        </footer>
      </body>
    </html>
  );
}
