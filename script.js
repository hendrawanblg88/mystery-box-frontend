const scriptURL = "https://script.google.com/macros/s/AKfycbyfWnx4Kv_X6LiUEt5E7ZTzVyliAuRKGulMDruPFq7WH70tbfJMvji8_r-QRWMQK1GJ/exec";

// Saat tombol "Play" diklik
document.getElementById("playButton").addEventListener("click", async () => {
  const id = document.getElementById("inputId").value;
  const kupon = document.getElementById("inputKupon").value;

  if (!id || !kupon) {
    alert("Harap isi ID dan Kupon!");
    return;
  }

  // Cek kupon ke backend
  try {
    const response = await fetch(`${scriptURL}?action=check&id=${id}&kupon=${kupon}`);
    const result = await response.json();

    if (result.status === 'valid') {
      // Lanjutkan spin
      const hadiah = await spin(); // kamu bisa definisikan fungsi spin sesuai animasi kamu
      alert("Selamat! Anda mendapat: " + hadiah);

      // Simpan hasil ke Google Sheet
      await fetch(`${scriptURL}?action=simpan&row=${result.row}&hadiah=${hadiah}`);
    } else if (result.status === 'used') {
      alert("Kupon ini sudah digunakan!");
    } else {
      alert("ID atau Kupon tidak ditemukan.");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan. Coba lagi nanti.");
  }
});

// Contoh fungsi spin (dummy, bisa kamu ganti pakai animasi roda)
function spin() {
  return new Promise((resolve) => {
    const hadiahList = ["Hadiah 1", "Hadiah 2", "Hadiah 3", "Hadiah 4"];
    const hasil = hadiahList[Math.floor(Math.random() * hadiahList.length)];
    setTimeout(() => resolve(hasil), 2000); // delay 2 detik seolah animasi spin
  });
}

