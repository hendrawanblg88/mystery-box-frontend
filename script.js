const API_URL = 'https://script.google.com/macros/s/AKfycbyfWnx4Kv_X6LiUEt5E7ZTzVyliAuRKGulMDruPFq7WH70tbfJMvji8_r-QRWMQK1GJ/exec';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-kupon");
  const hasilDiv = document.getElementById("hasil");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hasilDiv.innerHTML = "⏳ Memproses...";

    const id = document.getElementById("idInput").value.trim();
    const kupon = document.getElementById("kuponInput").value.trim();

    if (!id || !kupon) {
      hasilDiv.innerHTML = "❗ ID dan Kupon harus diisi.";
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: new URLSearchParams({
          action: "check",
          id,
          kupon
        })
      });

      const result = await res.json();

      if (result.status === "valid") {
        // Simpan baris ke variabel JS global, biar bisa dipakai saat hadiah diklik
        window.rowIndex = result.row;
        hasilDiv.innerHTML = "✅ Kupon valid. Silakan pilih hadiah!";
        window.sudahPilih = false;
      } else if (result.status === "used") {
        hasilDiv.innerHTML = "⚠️ Kupon ini sudah digunakan.";
      } else if (result.status === "invalid") {
        hasilDiv.innerHTML = "❌ ID atau Kupon tidak ditemukan.";
      } else {
        hasilDiv.innerHTML = "❗ Terjadi kesalahan tak terduga.";
      }

    } catch (error) {
      console.error(error);
      hasilDiv.innerHTML = "🚨 Gagal menghubungi server.";
    }
  });
});
