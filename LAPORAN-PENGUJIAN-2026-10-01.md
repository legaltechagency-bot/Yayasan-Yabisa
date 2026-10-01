# Pengujian YABISA, 1 Oktober 2026

## Pengujian ulang domain resmi

Perbaikan tambahan telah dideploy: filter campaign menggunakan kecocokan kategori persis; form konfirmasi memuat semua campaign CMS dan memilih campaign aktif; nominal minimal 1; pilihan anonim disertakan pada pesan WhatsApp; halaman kembali dari browser Back dipulihkan; klik dengan Ctrl/Shift tidak ditahan oleh transisi; penanganan gambar juga dipasang pada gambar CMS; kartu program/campaign beranda mengikuti CMS dengan template kartu dan batas tampilan yang sama.

Hasil browser setelah CMS selesai dimuat:

- Tujuh halaman utama terbuka tanpa error/warning console yang tertangkap, ID duplikat, atau tautan href kosong (#).
- Seluruh 20 tautan detail (6 campaign, 6 program, 4 artikel, 4 album) menampilkan judul yang sesuai dan tidak menampilkan undefined/null. Empat album masing-masing berisi 6 foto.
- Beranda menampilkan 3 artikel terbaru; halaman Artikel menampilkan 4 artikel.
- Filter Wakaf Al-Qur'an hanya menampilkan kategori wakaf-quran, bukan Braille.
- Tujuh halaman utama diperiksa pada viewport 390 x 844: tidak ada overflow horizontal; hamburger membuka menu.
- Beranda dan halaman login diperiksa pada viewport tablet 768 x 1024 tanpa overflow horizontal.
- Modal donasi terbuka, tombol salin rekening menampilkan notifikasi Berhasil disalin, Escape menutup modal. Nilai clipboard tidak dapat dikonfirmasi melalui alat browser.
- Form kontak kosong dan form konfirmasi kosong tidak berpindah halaman atau mengirim pesan. Modal konfirmasi Mari Berqurban memuat enam campaign dan memilih Mari Berqurban.
- Browser Back mengembalikan body ke page-ready tanpa page-leaving.
- Admin domain resmi tanpa sesi diarahkan ke login. Tombol Tampilkan mengubah input password menjadi text; tab Daftar membuka form pendaftaran.

Enam pengujian otomatis Node lulus. Tidak dilakukan pengiriman pesan WhatsApp, pembuatan akun baru, atau penghapusan/reset data resmi. Pengujian ini tidak menjamin tidak ada bug pada seluruh kombinasi perangkat dan kondisi jaringan; hasil berlaku untuk alur dan viewport yang dicatat.

## Pembaruan setelah Supabase diaktifkan

Endpoint Supabase kembali normal, status HTTP 200. Data online berisi 6 campaign, 6 program, 4 artikel, 4 album, dan 0 video. Simpan ulang campaign, artikel, program, dan album melalui sesi admin berhasil; timestamp database diperbarui. Semua album tetap memiliki 6 foto setelah edit. Tidak ada konten resmi dihapus atau direset.

Perbaikan commit 4842935 sudah dikirim ke GitHub dan diverifikasi tampil di Vercel/domain resmi (admin cache v9). Galeri publik memuat 4 album dari Supabase; detail Asrama Yatim YABISA memuat 6 foto, tanpa error/warning pada console yang diperiksa.

Logout diuji dari sesi admin aktif: kembali ke admin-login.html?logged_out=1, tetap pada login setelah refresh, dan membuka admin.html kembali diarahkan ke login.

Pengujian ekspor JSON melalui alat browser mengalami timeout sehingga keberhasilan unduhan belum terkonfirmasi. Pelepasan object URL ditunda 10 detik dan anchor dipasang ke DOM saat unduhan dimulai.

Batas pengujian: belum dilakukan tambah/hapus konten uji pada produksi, impor JSON yang menimpa seluruh data, reset data resmi, upload file baru, dan login ulang dengan password. Hasil di bawah mendokumentasikan kondisi awal sebelum proyek diaktifkan kembali; temuan DNS sudah terselesaikan oleh aktivasi proyek.

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
