const API_URL = 'https://script.google.com/macros/s/AKfycbyfWnx4Kv_X6LiUEt5E7ZTzVyliAuRKGulMDruPFq7WH70tbfJMvji8_r-QRWMQK1GJ/exec';

const idInput = document.getElementById('idInput');
const kuponInput = document.getElementById('kuponInput');
const tombolMulai = document.getElementById('btnMulai');
const hasilDiv = document.getElementById('hasil');

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
      const hadiahList = ['Voucher 50rb', 'Pulsa 100rb', 'Saldo DANA 25rb', 'Voucher Belanja', 'ZONK 😅'];
      const hadiah = hadiahList[Math.floor(Math.random() * hadiahList.length)];

      hasilDiv.innerHTML = `🎉 Selamat! Kamu mendapatkan: <strong>${hadiah}</strong>`;

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
    hasilDiv.innerHTML = '❗ Terjadi kesalahan saat menghubungi server.';
  }
});
