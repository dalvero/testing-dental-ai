"use client";
import { useState } from "react";

export default function DeteksiPage() {
  // STATE UNTUK MENYIMPAN GAMBAR HASIL UPLOAD (DALAM BENTUK base64)
  const [image, setImage] = useState<string | null>(null);

  // STATE UNTUK MENYIMPAN HASIL DETEKSI (TEKS OUTPUT)
  const [result, setResult] = useState<string | null>(null);

  // STATE UNTUK MENAMPILKAN FORM DETEKSI MANUAL
  const [showManualForm, setShowManualForm] = useState(false);

  // STATE UNTUK MENYIMPAN DATA DARI DETEKSI MANUAL
  const [manualResult, setManualResult] = useState<string | null>(null);
  const [manualNote, setManualNote] = useState("");

  /**
   * handleUpload()
   * ----------------------------
   * Ketika user memilih gambar dari galeri atau file explorer.
   * File akan dibaca dan dikonversi menjadi base64 agar bisa langsung ditampilkan.
   */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // MENGAMBIL FILE PERTAMA YANG DIUPLOAD
    if (!file) return; // JIKA TIDAK ADA FILE, STOP FUNGSINYA

    const reader = new FileReader(); // MEMBUAT FileReader UNTUK MEMBACA GAMBAR
    reader.onload = () => {
      setImage(reader.result as string); // MENYIMPAN GAMBAR DALAM STATE SEBAGAI base64
      setResult(null); // RESET HASIL DETEKSI JIKA ADA UPLOAD BARU
      setShowManualForm(false); // SEMBUNYIKAN FORM MANUAL JIKA ADA UPLOAD BARU
      setManualResult(null); // RESET HASIL MANUAL
      setManualNote(""); // RESET CATATAN MANUAL
    };
    reader.readAsDataURL(file); // MEMBACA FILE DAN MENGUBAHNYA MENJADI DATA URL (base64)
  };

  /**
   * handleDetectAI()
   * ----------------------------
   * Fungsi sementara untuk simulasi deteksi AI.
   * Nantinya akan diganti dengan pemanggilan API dari server AI.
   */
  const handleDetectAI = async () => {
    // 👇 Contoh simulasi proses AI
    setResult("🚧 Model AI belum diaktifkan. Ini hanya hasil dummy.");
    // Catatan: Di sini nanti cukup ubah dengan fetch() ke API AI yang sebenarnya.
  };

  /**
   * handleManualDetect()
   * ----------------------------
   * Menampilkan form deteksi manual di bawah hasil deteksi.
   */
  const handleManualDetect = () => {
    setShowManualForm(true);
  };

  /**
   * handleSaveManual()
   * ----------------------------
   * Menyimpan hasil deteksi manual dari dropdown dan catatan.
   */
  const handleSaveManual = () => {
    if (!manualResult) return alert("Pilih hasil deteksi manual terlebih dahulu!");
    setShowManualForm(false); // SEMBUNYIKAN FORM SETELAH DISIMPAN
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center py-10 px-4 gap-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg_login.png')" }}
    >
      {/* CONTAINER UTAMA */}
      <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col items-center gap-6 max-w-lg w-full shadow-md">
        {/* JUDUL HALAMAN */}
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

        {/* TOMBOL AKSI: UPLOAD - DETEKSI AI - DETEKSI MANUAL */}
        <div className="flex w-full max-w-md justify-center gap-3 flex-wrap">
          {/* TOMBOL UPLOAD */}
          <label className="cursor-pointer font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition text-sm">
            Upload Gambar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          {/* TOMBOL DETEKSI AI */}
          <button
            onClick={handleDetectAI}
            disabled={!image}
            className={`px-4 py-3 rounded-lg text-sm transition ${
              image
                ? "bg-emerald-700 hover:bg-emerald-800 cursor-pointer text-white font-semibold"
                : "bg-gray-400 text-white font-semibold cursor-not-allowed"
            }`}
          >
            Deteksi AI
          </button>

          {/* TOMBOL DETEKSI MANUAL */}
          <button
            onClick={handleManualDetect}
            disabled={!image}
            className={`px-4 py-3 rounded-lg text-sm transition ${
              image
                ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white font-semibold"
                : "bg-gray-400 text-white font-semibold cursor-not-allowed"
            }`}
          >
            Deteksi Manual
          </button>
        </div>
      </div>

      {/* HASIL DETEKSI AI */}
      {result && (
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col items-center gap-4 max-w-lg w-full shadow-md">
          <h2 className="font-semibold text-emerald-700 text-lg">Hasil Deteksi AI:</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}

      {/* FORM DETEKSI MANUAL */}
      {showManualForm && (
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col gap-5 max-w-lg w-full shadow-md">
          <h2 className="font-semibold text-yellow-600 text-lg text-center">
            Deteksi Manual
          </h2>

          {/* DROPDOWN HASIL MANUAL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Hasil Pemeriksaan
            </label>
            <select
              value={manualResult || ""}
              onChange={(e) => setManualResult(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border font-medium cursor-pointer text-gray-700 border-gray-300 focus:outline-emerald-700"
            >
              <option value="" disabled>
                Pilih hasil...
              </option>
              <option value="Normal">Normal</option>
              <option value="Karies Ringan">Karies Ringan</option>
              <option value="Karies Parah">Karies Parah</option>
            </select>
          </div>

          {/* CATATAN TAMBAHAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              value={manualNote}
              onChange={(e) => setManualNote(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border text-gray-700 border-gray-300 focus:outline-emerald-700 resize-none"
              rows={4}
              placeholder="Tambahkan catatan hasil pemeriksaan manual..."
            />
          </div>

          {/* TOMBOL SIMPAN */}
          <button
            onClick={handleSaveManual}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Simpan Hasil Manual
          </button>
        </div>
      )}

      {/* HASIL DETEKSI MANUAL */}
      {manualResult && (
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 flex flex-col items-center gap-4 max-w-lg w-full shadow-md">
          <h2 className="font-semibold text-yellow-600 text-lg">
            Hasil Deteksi Manual:
          </h2>
          <p className="text-gray-700 font-medium">Status: {manualResult}</p>
          {manualNote && (
            <p className="text-gray-600 text-sm italic">
              Catatan: {manualNote}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
