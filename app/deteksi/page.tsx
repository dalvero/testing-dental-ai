"use client";
import { useState } from "react";

export default function DeteksiPage() {

    // STATE UNTUK MENYIMPAN GAMBAR HASIL UPLOAD (DALAM BENTUK base64)
    const [image, setImage] = useState<string | null>(null);

    // STATE UNTUK MENYIMPAN HASIL DETEKSI (TEKS OUTPUT)
    const [result, setResult] = useState<string | null>(null);

    // FUNGSI KETIKA USER MEMILIH FILE GAMBAR
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];   // MENGAMBIL FILE PERTAMA YANG DIUPLOAD
    if (!file) return;                  // JIKA TIDAK ADA FILE, STOP FUNGSINYA

    const reader = new FileReader();     // MEMBUAT FileReader UNTUK MEMBACA GAMBAR
    reader.onload = () => {
        setImage(reader.result as string); // MENYIMPAN GAMBAR DALAM STATE SEBAGAI base64
        setResult(null);                   // RESET HASIL DETEKSI JIKA ADA UPLOAD BARU
    };
    reader.readAsDataURL(file);          // MEMBACA FILE DAN MENGUBAHNYA MENJADI DATA URL (base64)
    };

    // FUNGSI SEMENTARA UNTUK SIMULASI DETEKSI AI
    const handleDetectPlaceholder = () => {
    // RESULT SEBAGAI OUTPUT DUMMY
    setResult("🚧 Model AI belum diaktifkan. Ini hanya hasil dummy.");
    };


  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10 px-4 gap-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg_login.png')" }}
    >
      {/* CONTAINER */}
      <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col items-center gap-6 max-w-lg w-full">
        {/* JUDUL */}
        <h1 className="text-3xl font-bold text-emerald-700 text-center">
            Deteksi Karies Gigi
        </h1>
        {/* CONTAINER GAMBAR */}
        <div className="w-full max-w-md min-h-[280px] bg-white rounded-xl flex items-center justify-center p-4">
            {image ? (
            <img src={image} alt="preview" className="w-full rounded-lg" />
            ) : (
            <p className="text-gray-700 font-semibold text-center">
                Belum ada gambar yang diunggah
            </p>
            )}
        </div>

        {/* TOMBOL UPLOAD & DETEKSI */}
        <div className="flex w-full max-w-md justify-center gap-4">
            <label className="cursor-pointer font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition text-sm">
            Upload Gambar
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
            />
            </label>

            <button
            onClick={handleDetectPlaceholder}
            disabled={!image}
            className={`px-5 py-3 rounded-lg text-sm transition ${
                image
                ? "bg-emerald-700 hover:bg-emerald-700 cursor-pointer text-white font-semibold"
                : "bg-gray-400 text-white font-semibold cursor-not-allowed"
            }`}
            >
            Deteksi Gambar
            </button>
        </div>        
    </div>

    {/* HASIL DETEKSI */}
    {result && (
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col items-center gap-6 max-w-lg w-full">
            <h2 className="font-semibold text-emerald-700 text-lg mb-2">Hasil Deteksi:</h2>
            <p className="text-gray-700">{result}</p>
        </div>
    )}
    </div>
  );
}
