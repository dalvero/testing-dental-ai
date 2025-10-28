import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-cover bg-center" style={{
        backgroundImage: "url('/images/bg_login.png')",
      }}>
      <main className="max-w-xl w-full text-center flex flex-col p-10 rounded-2xl bg-white items-center gap-8">
        <h1 className="text-3xl font-bold text-emerald-700">
          Selamat Datang di Aplikasi Edukasi Gigi 🦷
        </h1>

        <p className="text-gray-700 text-lg">
          Aplikasi ini membantu mengenali karies / gigi berlubang menggunakan AI.
          Saat ini kita baru membuat tampilan awal & fitur upload gambar.
        </p>

        <Link
          href="/deteksi"
          className="mt-6 bg-emerald-700 hover:bg-emerald-500 text-white px-6 py-3 font-semibold rounded-lg transition"
        >
          Mulai Deteksi Gigi
        </Link>
      </main>
    </div>
  );
}
