const scriptURL = "https://script.google.com/macros/s/AKfycbyfWnx4Kv_X6LiUEt5E7ZTzVyliAuRKGulMDruPFq7WH70tbfJMvji8_r-QRWMQK1GJ/exec";

document.getElementById("playButton").addEventListener("click", async () => {
  const id = document.getElementById("inputId").value.trim();
  const kupon = document.getElementById("inputKupon").value.trim();

  if (!id || !kupon) {
    alert("Harap isi ID dan Kupon!");
    return;
  }

  try {
    // Cek kupon ke backend (POST request)
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "checkCoupon",
        id: id,
        kupon: kupon
      })
    });

    const result = await response.json();

    if (result.status === 'valid') {
      // Lanjutkan spin
      const hadiah = await spin();
      alert("Selamat! Anda mendapat: " + hadiah);

      // Simpan hasil spin ke Google Sheet
      await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "simpanHasil",
          row: result.row,
          hadiah: hadiah
        })
      });

    } else if (result.status === 'used') {
      alert("Kupon ini sudah digunakan!");
    } else {
      alert("ID atau Kupon tidak ditemukan.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Terjadi kesalahan. Coba lagi nanti.");
  }
});

// Fungsi spin dummy (ganti dengan animasi kalau mau)
function spin() {
  return new Promise((resolve) => {
    const hadiahList = ["Hadiah 1", "Hadiah 2", "Hadiah 3", "Hadiah 4"];
    const hasil = hadiahList[Math.floor(Math.random() * hadiahList.length)];
    setTimeout(() => resolve(hasil), 2000); // delay 2 detik seolah animasi spin
  });
}
