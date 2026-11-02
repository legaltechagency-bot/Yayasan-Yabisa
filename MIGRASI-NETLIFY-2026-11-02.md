# Migrasi YABISA ke Netlify

Tanggal: 2 November 2026 (WIB).

## Hasil

Website resmi sudah dilayani Netlify melalui HTTPS:

- https://www.yayasanbukitcahayaindonesia.or.id/
- https://www.yayasanbukitcahayaindonesia.or.id/admin-login.html
- https://yayasanbukitcahayaindonesia.netlify.app/

Domain tanpa www diarahkan otomatis ke www. Sertifikat Let's Encrypt aktif untuk domain utama dan wildcard subdomain. Sebagian resolver dapat tetap memakai cache DNS lama selama propagasi.

Setelah penggantian primary domain, browser pengujian sempat menyimpan redirect lama www ke apex. Cache HTTP pengujian dibersihkan; halaman root www kemudian berhasil dibuka dan CMS selesai dimuat. Cookies dan localStorage tidak dihapus. Tidak ada perubahan cache yang menonaktifkan perlindungan browser.

## Konfigurasi

- Team Netlify: Legal Tech agency (legaltechagency).
- Project: yayasanbukitcahayaindonesia.
- Repository: legaltechagency-bot/Yayasan-Yabisa, branch main; deployment otomatis diverifikasi pada commit 044b0d9.
- Nameserver di IDwebhost sudah disimpan: dns1.p07.nsone.net, dns2.p07.nsone.net, dns3.p07.nsone.net, dns4.p07.nsone.net.
- Zona Netlify memuat dua record NETLIFY untuk apex dan www, serta tiga record CAA yang dipertahankan: letsencrypt.org, pki.goog, sectigo.com. Tidak ditemukan record MX pada pemeriksaan sebelum migrasi.
- Supabase tetap memakai proyek gjkdcintqferjxmvwxym. Tidak ada data CMS atau akun yang dihapus/reset/dipindahkan.
- Site URL Supabase sebelumnya localhost:3000, diperbarui ke https://www.yayasanbukitcahayaindonesia.or.id/admin-login.html.
- Redirect URL diizinkan secara persis untuk admin-login.html pada domain www, domain tanpa www, dan alamat Netlify di atas.
- Metadata .netlify/ ditambahkan ke .gitignore.

## Perbaikan kompatibilitas

Pemrosesan Pretty URLs Netlify mengubah href HTML menjadi /nama-halaman. Selector kartu beranda lama mengakibatkan error null.href. cmsPageLink sekarang menerima URL relatif, absolut, .html, dan tanpa ekstensi. Pendeteksian halaman login juga menerima kedua bentuk URL. Desain dan nama file tidak diganti.

## Pengujian

- Tujuh pengujian otomatis Node lulus, termasuk regresi URL Netlify.
- Beranda berhasil memuat 3 artikel terbaru dari CMS setelah perbaikan.
- Halaman publik Netlify menampilkan 6 program, 6 campaign, 4 artikel, dan 4 album.
- Semua 15 endpoint halaman/aset utama yang diuji pada alamat sementara mengembalikan HTTP 200.
- Semua 16 endpoint halaman/aset utama yang diuji pada domain resmi mengembalikan HTTP 200 dari server Netlify, termasuk logo, manifest, dan service worker admin.
- Modal donasi pada domain resmi terbuka dan dapat ditutup dengan Escape.
- Akses admin.html tanpa sesi dialihkan ke admin-login.html.
- Endpoint CMS Supabase merespons 200; jumlah data tetap 6 campaign, 6 program, 4 artikel, 4 album. Timestamp konten tidak diubah selama migrasi.
- Cloudflare DNS sudah mengembalikan keempat nameserver Netlify.
- Domain apex dan www telah diverifikasi melalui HTTPS dengan validasi TLS normal; apex berakhir pada www.

Login dengan password, upload baru, dan simpan ulang konten melalui akun admin tidak diuji dalam migrasi ini karena tidak tersedia sesi login website pada domain baru. Halaman login dan akses baca CMS telah diverifikasi.

Catatan: satu error MutationObserver tanpa URL sumber sempat muncul bersamaan dengan badge Netlify yang disisipkan platform. Kode aplikasi tidak menggunakan MutationObserver; pemuatan CMS dan navigasi yang diuji tetap berjalan. Error platform tersebut belum diperbaiki pada kode website.

## Vercel

Akun Vercel sudah ditangguhkan sebelum migrasi dan domain lama sempat mengembalikan HTTP 402. Penambahan record DNS transisi ditolak oleh Vercel karena status tagihan; perubahan tersebut tidak tersimpan. Migrasi diselesaikan melalui nameserver IDwebhost. Tidak ada penghapusan proyek, perubahan paket, pembayaran, atau aktivasi langganan Vercel yang dilakukan.
