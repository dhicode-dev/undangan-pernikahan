# Undangan Pernikahan Digital

Struktur:
- index.html      -> isi & teks undangan (nama, tanggal, lokasi, rekening)
- css/style.css   -> warna (variabel di :root), font, tata letak
- js/script.js    -> countdown (ubah `target`), link kalender, RSVP
- assets/img      -> taruh foto prewedding di sini
- assets/audio    -> taruh musik latar (opsional)

Menjalankan: buka index.html, atau di VS Code pasang ekstensi "Live Server" lalu klik "Go Live".

Nama tamu: tambahkan ?to=Nama+Tamu di URL, contoh index.html?to=Valdi+%26+Partner

Yang perlu diganti:
1. Nama mempelai, orang tua, tanggal, lokasi (index.html)
2. Tanggal hitung mundur + link kalender (js/script.js, cari 2026-12-20)
3. Rekening (index.html, atribut data-copy dan teks)
4. Galeri: ganti <i></i> dengan <img src="assets/img/foto1.jpg" alt=""> lalu atur gaya `.gal img` di CSS
5. Musik: tambahkan <audio id="bgm" src="assets/audio/lagu.mp3" loop></audio> dan panggil
   document.getElementById('bgm').play() di dalam handler tombol "Buka Undangan"

Catatan: ucapan RSVP disimpan di localStorage (hanya di browser pengunjung). Untuk
mengumpulkan semua ucapan, sambungkan ke backend, mis. Google Apps Script / Firebase.

## Foto mempelai & musik
- Foto: simpan di assets/img dengan nama helena.jpg dan awal.jpg (rasio kotak/persegi, ukuran < 300 KB).
  Jika file belum ada, otomatis tampil inisial H / A.
- Musik: simpan sebagai assets/audio/musik.mp3 (ukuran < 3 MB). Musik mulai saat tamu menekan
  "Buka Undangan"; tombol bulat di pojok kanan bawah untuk jeda/putar. Jika file belum ada, tombol disembunyikan.
- Ganti nama file di index.html (atribut src) jika ingin nama lain.

## Daftar foto yang dipakai (assets/img/)
cover.jpg (latar cover, potret) | hero.jpg (latar halaman utama) | outro.jpg (latar penutup)
helena.jpg, awal.jpg (foto mempelai, persegi) | g1.jpg ... g6.jpg (galeri; g1 tinggi, g6 lebar)
bank/bca.png, bank/mandiri.png, bank/dana.png (logo; jika tidak ada tampil badge teks)
Semua opsional: jika file belum ada, tampil gradasi navy/emas sebagai pengganti.
Tips: kompres foto (squoosh.app), lebar maks 1600 px, < 300 KB per foto.
Tambah rekening: salin satu blok <div class="rek"> di index.html, ganti data-logo, nama, nomor.
