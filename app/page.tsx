"use client"
import { useState } from 'react';

export default function GeminiVisionStudio() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState<{url: string, time: string, prompt: string}[]>([]);

    const getTime = () => new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true 
    });

    // Fungsi untuk membuat 1 gambar
    const generateSingle = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            if (data.url) {
                setGallery([{ url: data.url, time: getTime(), prompt }, ...gallery]);
            }
        } catch (e) { alert("Gagal membuat gambar tunggal"); }
        setLoading(false);
    };

    // Fungsi Baru: Membuat banyak gambar sekaligus (Generate All)
    const generateAll = async () => {
        if (!prompt) return;
        setLoading(true);
        try {
            const res = await fetch('/api/generate-all', {
                method: 'POST',
                body: JSON.stringify({ prompt, count: 3 }), // Meminta 3 gambar
            });
            const data = await res.json();
            if (data.images) {
                const newItems = data.images.map((url: string) => ({
                    url,
                    time: getTime(),
                    prompt
                }));
                setGallery([...newItems, ...gallery]);
            }
        } catch (e) { alert("Gagal membuat banyak gambar"); }
        setLoading(false);
    };

    const downloadImg = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `GeminiVision_${getTime().replace(/:/g, '-')}.png`;
        link.click();
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-10 font-sans">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-2">
                    <span className="text-blue-500">Gemini</span> Vision Studio 💎
                </h1>
                <p className="text-gray-400 mb-8">The Power of Nano Banana AI</p>

                <div className="flex flex-col gap-4 mb-10">
                    <input 
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500"
                        value={prompt} 
                        onChange={(e) => setPrompt(e.target.value)} 
                        placeholder="Ketik deskripsi gambar di sini..."
                    />
                    <div className="flex gap-2 justify-center">
                        <button 
                            onClick={generateSingle} 
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
                        >
                            {loading ? '...' : 'Buat Satu ✨'}
                        </button>
                        <button 
                            onClick={generateAll} 
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold transition"
                        >
                            {loading ? 'Processing...' : 'Generate All (x3) 🚀'}
                        </button>
                    </div>
                </div>

                {/* Galeri Utama dengan Fitur Download & AM/PM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {gallery.map((img, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/10 relative group">
                            <img src={img.url} className="w-full aspect-square object-cover rounded-xl mb-3" />
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] text-blue-400 font-mono">{img.time}</span>
                                <button 
                                    onClick={() => downloadImg(img.url)}
                                    className="bg-green-600 hover:bg-green-500 p-2 rounded-lg text-xs"
                                >
                                    Simpan 📥
                                </button>
                            </div>
                        </div>
                    ))}
                    {gallery.length === 0 && !loading && (
                        <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-3xl text-gray-600">
                            Hasil gambar kamu akan muncul di sini...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
