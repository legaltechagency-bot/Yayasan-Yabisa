-- Jalankan di Supabase SQL Editor project YABISA: gjkdcintqferjxmvwxym
-- Public hanya bisa membaca data CMS. Hanya email di yabisa_admins yang bisa mengubah konten.

create table if not exists public.yabisa_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.yabisa_admins enable row level security;

drop policy if exists "Admins can read own admin record" on public.yabisa_admins;
create policy "Admins can read own admin record"
on public.yabisa_admins
for select
to authenticated
using (lower(email) = lower((auth.jwt() ->> 'email')));

insert into public.yabisa_admins (email)
values ('yabisaofficial2004@gmail.com'), ('abimalsyazani@gmail.com')
on conflict (email) do nothing;

create table if not exists public.yabisa_cms (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.yabisa_cms enable row level security;

drop policy if exists "Public can read YABISA CMS" on public.yabisa_cms;
create policy "Public can read YABISA CMS"
on public.yabisa_cms
for select
to anon, authenticated
using (true);

drop policy if exists "YABISA admins can insert CMS" on public.yabisa_cms;
create policy "YABISA admins can insert CMS"
on public.yabisa_cms
for insert
to authenticated
with check (exists (
  select 1 from public.yabisa_admins admins
  where lower(admins.email) = lower((auth.jwt() ->> 'email'))
));

drop policy if exists "YABISA admins can update CMS" on public.yabisa_cms;
create policy "YABISA admins can update CMS"
on public.yabisa_cms
for update
to authenticated
using (exists (
  select 1 from public.yabisa_admins admins
  where lower(admins.email) = lower((auth.jwt() ->> 'email'))
))
with check (exists (
  select 1 from public.yabisa_admins admins
  where lower(admins.email) = lower((auth.jwt() ->> 'email'))
));

insert into public.yabisa_cms (id, data, updated_at)
values ('main', '{"campaigns":[{"id":"rumah-harapan-anak-yatim","title":"Wujudkan Rumah Harapan Anak Yatim","category":"asrama-yatim","target":"Rp500.000.000","collected":"Rp120.000.000","percent":24,"image":"images/hero-asrama-yabisa.jpg","desc":"Mari hadirkan tempat tinggal yang layak sebagai rumah tumbuh, belajar, dan menggapai masa depan bagi anak-anak yatim."},{"id":"sedekah-beras","title":"Sedekah Beras, Hadirkan Senyum di Setiap Piring","category":"sedekah-beras","target":"Rp15.000.000 per bulan","collected":"Rp6.900.000","percent":46,"image":"images/tentang-asrama-yabisa.jpeg","desc":"Satu karung beras yang Anda berikan dapat menjadi sumber kebahagiaan bagi keluarga yang membutuhkan."},{"id":"wakaf-quran","title":"Wakaf Al-Qur''an, Hadiah Pahala yang Terus Mengalir","category":"wakaf-quran","target":"Rp20.000.000","collected":"Rp7.000.000","percent":35,"image":"images/profile-kegiatan-yabisa.jpeg","desc":"Setiap huruf yang dibaca menjadi amal jariyah yang terus mengalir untuk Anda."},{"id":"jumat-berkah","title":"Jumat Berkah, Tebar Kebahagiaan","category":"jumat-berkah","target":"Rp10.000.000 per bulan","collected":"Rp3.000.000","percent":30,"image":"images/tentang-asrama-yabisa.jpeg","desc":"Mari hadirkan kebahagiaan untuk anak-anak yatim melalui santunan dan makan siang bergizi setiap hari Jumat."},{"id":"wakaf-quran-braille","title":"Wakaf Al-Qur''an Braille untuk Sahabat Tunanetra","category":"wakaf-quran-braille","target":"Rp100.000.000","collected":"Rp12.000.000","percent":12,"image":"images/profile-kegiatan-yabisa.jpeg","desc":"Mari hadirkan cahaya Al-Qur''an bagi sahabat tunanetra melalui Wakaf Al-Qur''an Braille."},{"id":"mari-berqurban","title":"Mari Berqurban, Tebar Manfaat Hingga Pelosok","category":"mari-berqurban","target":"Rp250.000.000","collected":"Rp25.000.000","percent":10,"image":"images/profile-kegiatan-yabisa.jpeg","desc":"Salurkan qurban terbaik untuk menghadirkan manfaat bagi anak binaan dan masyarakat yang membutuhkan."}],"programs":[{"id":"asrama-yatim","title":"Asrama Yatim","category":"pendidikan sosial","campaignCategory":"asrama-yatim","target":"Anak yatim dan dhuafa","status":"Berjalan","image":"images/hero-asrama-yabisa.jpg","desc":"Rumah pembinaan dan pendampingan bagi anak yatim agar tumbuh mandiri dan berakhlak mulia.","content":"Asrama Yatim YABISA menjadi ruang tumbuh bagi anak-anak yatim dan dhuafa. Program ini mendukung kebutuhan tempat tinggal, pendidikan, pembinaan akhlak, mengaji, bimbingan belajar, kesehatan, pangan, dan kebutuhan harian anak-anak asrama."},{"id":"jumat-berkah","title":"Jumat Berkah","category":"sosial keagamaan","campaignCategory":"jumat-berkah","target":"Anak yatim dan masyarakat sekitar","status":"Rutin","image":"images/tentang-asrama-yabisa.jpeg","desc":"Kegiatan berbagi rutin untuk menghadirkan kebahagiaan dan kepedulian setiap Jumat.","content":"Jumat Berkah menjadi program rutin untuk menumbuhkan budaya berbagi. Kegiatan ini dapat berupa santunan, makan bersama, pembagian nasi box, dan dukungan kebutuhan sederhana bagi anak binaan serta masyarakat sekitar."},{"id":"sedekah-beras","title":"Sedekah Beras","category":"sosial kemanusiaan","campaignCategory":"sedekah-beras","target":"Anak binaan dan masyarakat membutuhkan","status":"Rutin","image":"images/tentang-asrama-yabisa.jpeg","desc":"Dukungan pangan untuk anak binaan dan masyarakat yang membutuhkan.","content":"Sedekah Beras membantu memenuhi kebutuhan pangan anak binaan, keluarga dhuafa, dan masyarakat yang membutuhkan. Dukungan donatur menjadi bagian penting agar kebutuhan pokok dapat terus terpenuhi."},{"id":"wakaf-quran","title":"Wakaf Al-Qur''an","category":"keagamaan","campaignCategory":"wakaf-quran","target":"Santri, anak binaan, dan masyarakat","status":"Berjalan","image":"images/profile-kegiatan-yabisa.jpeg","desc":"Distribusi mushaf untuk mendukung pembelajaran, ibadah, dan amal jariyah.","content":"Wakaf Al-Qur''an membantu menghadirkan mushaf bagi penerima manfaat agar kegiatan membaca, menghafal, dan mempelajari Al-Qur''an dapat berjalan lebih baik."},{"id":"wakaf-quran-braille","title":"Wakaf Al-Qur''an Braille","category":"keagamaan kemanusiaan","campaignCategory":"wakaf-quran-braille","target":"Sahabat tunanetra","status":"Berjalan","image":"images/profile-kegiatan-yabisa.jpeg","desc":"Membantu sahabat tunanetra membaca dan mempelajari Al-Qur''an.","content":"Wakaf Al-Qur''an Braille ditujukan untuk sahabat tunanetra agar mereka memiliki akses yang lebih baik untuk membaca dan mempelajari firman Allah."},{"id":"mari-berqurban","title":"Mari Berqurban","category":"keagamaan sosial","campaignCategory":"mari-berqurban","target":"Penerima manfaat dan masyarakat luas","status":"Musiman","image":"images/profile-kegiatan-yabisa.jpeg","desc":"Menyalurkan manfaat qurban kepada penerima manfaat dan masyarakat luas.","content":"Mari Berqurban menjadi program musiman untuk menyalurkan hewan qurban kepada penerima manfaat. Program ini menguatkan kepedulian sosial dan menghadirkan kebahagiaan di hari raya."}],"gallery":[{"id":"kegiatan-sosial-relawan","title":"Kegiatan Sosial Relawan","tag":"Dokumentasi","image":"images/profile-pengurus-yabisa.jpeg","images":["images/profile-pengurus-yabisa.jpeg"],"desc":"Kebersamaan relawan dalam mendampingi penerima manfaat."}],"videos":[],"articles":[{"id":"pembinaan-anak-yatim-berkelanjutan","title":"Mengapa Pembinaan Anak Yatim Perlu Berkelanjutan?","date":"2026-07-21","category":"Edukasi","image":"images/tentang-asrama-yabisa.jpeg","excerpt":"Bantuan terbaik tidak hanya hadir sesaat, tetapi ikut membangun karakter, pendidikan, dan kemandirian anak.","content":"<p>Pembinaan anak yatim membutuhkan perhatian yang berkelanjutan. Anak-anak tidak hanya memerlukan bantuan kebutuhan harian, tetapi juga pendampingan pendidikan, akhlak, kesehatan, dan lingkungan yang aman untuk bertumbuh.</p><p>Melalui Asrama Yatim YABISA, Yayasan Bukit Cahaya Indonesia berupaya menghadirkan rumah kedua yang mendampingi anak-anak dalam proses belajar, mengaji, membangun karakter, dan menumbuhkan rasa percaya diri.</p><p>Dukungan masyarakat menjadi bagian penting agar proses pembinaan ini dapat berjalan konsisten dan memberi dampak nyata bagi masa depan anak-anak binaan.</p>"},{"id":"sedekah-beras-keluarga-dhuafa","title":"Sedekah Beras dan Dampaknya bagi Keluarga Dhuafa","date":"2026-07-21","category":"Sosial","image":"images/tentang-asrama-yabisa.jpeg","excerpt":"Kebutuhan pangan yang terpenuhi dapat membantu keluarga menjaga kesehatan dan ketenangan hidup sehari-hari.","content":"<p>Sedekah beras merupakan bentuk kepedulian sederhana yang sangat dekat dengan kebutuhan masyarakat. Bagi keluarga dhuafa, ketersediaan bahan pangan pokok dapat membantu mengurangi beban harian dan menjaga ketenangan keluarga.</p><p>YABISA menyalurkan dukungan pangan kepada anak binaan dan masyarakat yang membutuhkan melalui program yang dijalankan secara tertib dan penuh kehati-hatian.</p><p>Setiap bantuan yang diberikan menjadi bagian dari ikhtiar bersama untuk menghadirkan keberkahan dan rasa aman bagi penerima manfaat.</p>"},{"id":"jumat-berkah-kepedulian-konsisten","title":"Jumat Berkah: Membiasakan Kepedulian yang Konsisten","date":"2026-07-21","category":"Kegiatan","image":"images/profile-kegiatan-yabisa.jpeg","excerpt":"Program rutin membantu membangun kebiasaan berbagi yang tertib, dekat, dan menyentuh kebutuhan nyata.","content":"<p>Jumat Berkah menjadi ruang kebaikan yang mengajak masyarakat untuk berbagi secara rutin. Kegiatan ini dapat berupa santunan, makan bersama, pembagian nasi box, maupun dukungan kebutuhan sederhana bagi penerima manfaat.</p><p>Melalui program ini, YABISA ingin menjaga semangat kepedulian agar tidak hanya hadir pada momentum tertentu, tetapi menjadi kebiasaan baik yang terus tumbuh.</p><p>Kebaikan yang dilakukan bersama, meski sederhana, dapat menjadi sumber kebahagiaan dan semangat baru bagi anak-anak binaan serta masyarakat sekitar.</p>"}],"settings":{"whatsapp":"6285882874778","email":"yabisaofficial2004@gmail.com"}}'::jsonb, now())
on conflict (id) do update set
  data = excluded.data,
  updated_at = now();
