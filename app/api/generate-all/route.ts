import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Mengambil API Key dari environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { prompt, count = 3 } = await req.json(); // Default membuat 3 gambar

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key tidak ditemukan" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

        // Menjalankan beberapa permintaan gambar secara bersamaan
        const tasks = Array.from({ length: count }).map(() => model.generateContent(prompt));
        const results = await Promise.all(tasks);

        // Mengolah semua hasil gambar menjadi array Base64
        const images = results.map(result => {
            const data = result.response.candidates?.[0]?.content.parts[0].inlineData?.data;
            return `data:image/png;base64,${data}`;
        });

        return NextResponse.json({ images });
    } catch (error: any) {
        console.error("Generate All Error:", error);
        return NextResponse.json({ error: "Gagal membuat kumpulan gambar" }, { status: 500 });
    }
}
