// Ganti URL berikut dengan URL Web App dari Google Apps Script kamu
const API_URL = 'https://script.google.com/macros/s/AKfycbz18VrmRMZgmFiukKbJveShsJdynNa9SeFpae_CgRur1_jIRwbDQGWQJ6uL9IJhbiLO/exec';

// Ambil elemen input
const idInput = document.getElementById('idInput');
const kuponInput = document.getElementById('kuponInput');
const tombolMulai = document.getElementById('btnMulai');
const hasilDiv = document.getElementById('hasil');

// Event listener saat tombol diklik
tombolMulai.addEventListener('click', async () => {
  const id = idInput.value.trim();
  const kupon = kuponInput.value.trim();

  if (!id || !kupon) {
    alert('Isi ID dan Kupon terlebih dahulu!');
    return;
  }

  hasilDiv.innerHTML = 'Mengecek kupon...';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: new URLSearchParams({
        action: 'check',
        id,
        kupon
      })
    });

    const result = await response.json();

    if (result.status === 'valid') {
      // Tampilkan hadiah secara acak
      const hadiahList =  [1000, 2000, 3000, 5000, 8000, 10000, 100000, 1000000, 10000000]; // 9 item
      const hadiah = hadiahList[Math.floor(Math.random() * hadiahList.length)];

      hasilDiv.innerHTML = `🎉 Selamat! Kamu mendapatkan: <strong>${hadiah}</strong>`;

      // Simpan hasil ke Google Sheets
      await fetch(API_URL, {
        method: 'POST',
        body: new URLSearchParams({
          action: 'save',
          row: result.row,
          hadiah
        })
      });
    } else if (result.status === 'used') {
      hasilDiv.innerHTML = '❌ Kupon ini sudah digunakan.';
    } else {
      hasilDiv.innerHTML = '⚠️ Kupon tidak valid.';
    }
  } catch (error) {
    console.error(error);
    hasilDiv.innerHTML = 'Terjadi kesalahan saat menghubungi server.';
  }
});
