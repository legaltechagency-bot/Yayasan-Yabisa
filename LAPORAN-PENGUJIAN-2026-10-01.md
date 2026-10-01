# Pengujian YABISA, 1 Oktober 2026

Domain: https://www.yayasanbukitcahayaindonesia.or.id/

## Temuan utama

Endpoint yang dikonfigurasi, gjkdcintqferjxmvwxym.supabase.co, menghasilkan DNS name does not exist pada pemeriksaan melalui resolver 1.1.1.1. Browser menampilkan Failed to fetch saat membaca CMS dan sesi Auth. Proyek tersebut juga tidak tercantum pada akun connector Supabase yang tersedia. Ini tidak membuktikan bahwa proyek telah dihapus; pemilik perlu memeriksa status dan URL proyek pada akun yang sesuai.

Website publik tetap terbuka karena memakai cadangan lokal/default. Dengan kondisi ini, publikasi online, login baru, dan penyimpanan lintas perangkat belum dapat diverifikasi.

## Perbaikan file lokal

- yabisa-data.js: kegagalan cache lokal tidak menggagalkan data online; simpan online dijalankan sebelum cache diperbarui; simpan gagal mempertahankan cache sebelumnya.
- admin.js: edit album mempertahankan foto; ID edit tetap; ID baru dicegah bertabrakan; form dicegah disimpan ganda; reset/hapus gagal mengembalikan data sebelumnya; boot tidak lagi mengirim cadangan ke server otomatis; mutasi diblokir jika data online belum dimuat.
- cms.js: daftar kosong dibersihkan dan detail kosong tidak melempar error.
- script.js: pengaturan WhatsApp dapat menggunakan data online dalam memori meskipun cache gagal.
- admin-sw.js: cache v9, hanya GET dari origin sendiri dan respons sukses yang dicache.
- admin.html: keterangan dashboard diperbarui.
- tests/cms-storage.test.cjs: empat pengujian otomatis penyimpanan dan normalisasi.

## Hasil

Empat pengujian Node lulus. Pemeriksaan sintaks admin.js, cms.js, dan yabisa-data.js lulus. git diff --check lulus.

Pada domain publik, modal donasi terbuka, Escape menutup modal, FAQ terbuka, menu hamburger terbuka, dan filter Sedekah Beras menampilkan campaign yang sesuai. Admin pada domain resmi mengarahkan pengunjung tanpa sesi ke halaman login.

Pemeriksaan awal layar 390 x 844 dilakukan pada Profile, Program, Artikel, Galery, Kontak, dan empat halaman detail. Tidak ditemukan ID duplikat atau overflow horizontal. Pemeriksaan gambar awal tidak menemukan gambar rusak, tetapi ini bukan verifikasi seluruh gambar setelah CMS online dimuat.

## Belum selesai

Tambah, edit, hapus, upload enam foto, ekspor/impor ulang, persistensi setelah refresh, logout akun aktif, dan akses dari perangkat lain belum dapat diuji secara online karena endpoint Supabase tidak dapat dijangkau. Tidak ada konten resmi yang dihapus atau direset saat pengujian.

Perbaikan berada pada file lokal dan belum dikirim ke GitHub/Vercel. Setelah proyek Supabase aktif atau URL dan publishable key dikonfirmasi, lanjutkan pengujian CRUD dengan akun admin lalu deploy dan verifikasi ulang.
