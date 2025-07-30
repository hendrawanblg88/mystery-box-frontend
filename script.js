const API_URL = 'https://script.google.com/macros/s/AKfycbyfWnx4Kv_X6LiUEt5E7ZTzVyliAuRKGulMDruPFq7WH70tbfJMvji8_r-QRWMQK1GJ/exec';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-kupon");
  const hasilDiv = document.getElementById("hasil");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    hasilDiv.textContent = "⏳ Memproses...";

    const id = document.getElementById("idInput").value.trim();
    const kupon = document.getElementById("kuponInput").value.trim();

    if (!id || !kupon) {
      hasilDiv.textContent = "❗ ID dan Kupon harus diisi.";
      return;
    }

    try {
      const res = await fetch(`${API_URL}?id=${encodeURIComponent(id)}&kupon=${encodeURIComponent(kupon)}`);
      
      if (!res.ok) throw new Error("HTTP Error " + res.status);

      const result = await res.json();

      if (result.status === "valid") {
        window.rowIndex = result.row;
        window.sudahPilih = false;
        hasilDiv.textContent = "✅ Kupon valid. Silakan pilih hadiah!";
      } else if (result.status === "used") {
        hasilDiv.textContent = "⚠️ Kupon ini sudah digunakan.";
      } else if (result.status === "invalid") {
        hasilDiv.textContent = "❌ ID atau Kupon tidak ditemukan.";
      } else {
        hasilDiv.textContent = "❗ Terjadi kesalahan tak terduga.";
      }

    } catch (error) {
      console.error("Fetch error:", error);
      hasilDiv.textContent = "🚨 Gagal menghubungi server.";
    }
  });
});
