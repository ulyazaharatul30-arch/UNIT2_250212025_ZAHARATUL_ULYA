// Ini adalah bagian awal dari kode JavaScript yang akan dijalankan ketika halaman web dimuat
// Kode ini digunakan untuk menangani interaksi pada form pendaftaran ekskul

// Variabel formEkskul menyimpan referensi ke elemen HTML dengan id 'form-ekskul'
// Ini adalah elemen form yang akan kita tangani ketika pengguna mengirim data
const formEkskul = document.getElementById('form-ekskul');

// Variabel listPeserta menyimpan referensi ke elemen HTML dengan id 'list-peserta'
// Ini adalah tempat di mana kita akan menampilkan daftar siswa yang sudah mendaftar
const listPeserta = document.getElementById('list-peserta');

// Variabel errorMsg menyimpan referensi ke elemen HTML dengan id 'error-msg'
// Ini adalah elemen paragraf yang akan menampilkan pesan error jika ada kesalahan
const errorMsg = document.getElementById('error-msg');

// Baris ini menambahkan event listener ke formEkskul
// Event listener mendengarkan event 'submit' yang terjadi ketika form dikirim
// Ketika form dikirim, fungsi anonim (function(event) { ... }) akan dijalankan
formEkskul.addEventListener('submit', function(event) {
    // Di dalam fungsi ini, kita mencegah perilaku default dari event submit
    // Perilaku default adalah mengirim data ke server dan me-reload halaman
    // Dengan preventDefault(), halaman tidak akan reload, sehingga kita bisa menangani data secara manual
    event.preventDefault(); // Mencegah reload

    // Sekarang kita mengambil nilai dari input fields
    // document.getElementById('namasiswa') mencari elemen dengan id 'namaSiswa'
    // .value mengambil nilai yang diketik pengguna
    // .trim() menghapus spasi di awal dan akhir string
    const nama = document.getElementById('namasiswa').value.trim();

    // Sama seperti di atas, mengambil nilai NISN dan melakukan trim
    const nisn = document.getElementById('nisn').value.trim();

     // pengecekan jika NISN 10 digit maka benar dan jika NISN kurang dari 10 digit maka akan ditampilkan teks  error
    errorMsg.classList.add("error-hidden")
    if (!/^[0-9]{10}$/.test(nisn)) {
        errorMsg.textContent = "NISN tidak valid! Harus berjumlah 10 digit angka";
        errorMsg.classList.remove("error-hidden");
        errorMsg.classList.add("error-visible");
        return;
    }
    
    // Mengambil nilai dari dropdown select pilihan ekskul
    const ekskul = document.getElementById('pilihanekskul').value;

    // Sekarang kita reset pesan error
    // classList.replace mengganti class 'error-visible' dengan 'error-hidden'
    // Ini menyembunyikan pesan error yang mungkin sedang ditampilkan
    errorMsg.classList.replace('error-visible', 'error-hidden');

    // Kita cari elemen dengan class 'empty-list' yang menunjukkan daftar kosong
    // querySelector mencari elemen pertama yang cocok dengan selector '.empty-list'
    const emptyState = document.querySelector('.empty-list');

    // Jika elemen emptyState ada (tidak null), maka kita hapus elemen tersebut
    // Ini dilakukan agar pesan "Belum ada siswa yang mendaftar" hilang ketika ada siswa baru
    if (emptyState) emptyState.remove();

    // Sekarang kita buat elemen baru untuk kartu siswa
    // document.createElement('div') membuat elemen div baru
    const cardsiswa = document.createElement('div');

    // Kita tambahkan class 'card-siswa' ke elemen div yang baru dibuat
    // Ini untuk styling menggunakan CSS
    cardsiswa.classList.add('card-siswa');

    // Kita isi konten HTML ke dalam elemen cardSiswa menggunakan innerHTML
    // Template literal (dengan backticks) memungkinkan kita menyisipkan variabel dengan ${}
    // Konten ini akan menampilkan nama, NISN, dan ekskul siswa
    cardsiswa.innerHTML = `
        <h4>${nama}</h4>
        <p><strong>NISN:</strong> ${nisn}</p>
        <p><strong>Ekstrakurikuler:</strong> ${ekskul}</p>
    `;

    // Mengubah warna background  card siswa sesuai dengan pilihan ekskul yang dipilih
    if (ekskul.includes('Pramuka')) {
        cardsiswa.style.backgroundColor = 'bisque'; // Warna latar belakang untuk Pramuka
    } else if (ekskul.includes('Klub Coding & Robotik')) {
        cardsiswa.style.backgroundColor = 'skyblue'; // Warna latar belakang untuk Klub Coding & Robotik
    } else if (ekskul.includes('Palang Merah Remaja (PMR)')) {
        cardsiswa.style.backgroundColor = 'red'; // Warna latar belakang untuk Palang Merah Remaja (PMR)
    } else if (ekskul.includes('Jurnalistik Sekolah')) {
        cardsiswa.style.backgroundColor = 'plum'; // Warna latar belakang untuk Jurnalistik Sekolah
    }

    // Menambahkan tombol hapus pada card siswa di antarmuka layar (DOM) dimana ketika tombol hapus diklik, maka card siswa akan dihapus dari daftar peserta
    const tombolHapus = 
    document.createElement('button');
    tombolHapus.textContent = 'Hapus';
    tombolHapus.classList.add('tombol-hapus');
    cardsiswa.appendChild(tombolHapus);

    // Kita buat elemen tombol baru yaitu dengan menggunakan parentElement.remove() di dalam event listener
    listPeserta.addEventListener('click', function(event) {
        if (event.target.classList.contains('tombol-hapus')) {
            event.target.parentElement.remove(); // Menghapus kartu siswa yang terkait dengan tombol hapus ketika diklik
        }
    });


        

    // Sekarang kita tambahkan kartu siswa yang baru dibuat ke dalam listPeserta
    // appendChild menambahkan elemen anak baru ke elemen induk
    listPeserta.appendChild(cardsiswa);

    // Terakhir, kita bersihkan formulir
    // formEkskul.reset() mengosongkan semua input fields di dalam form
    formEkskul.reset();
});
