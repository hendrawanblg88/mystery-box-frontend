const apiUrl = "https://script.google.com/macros/s/AKfycbx_3SH9blPz4v/exec"; // ganti dengan URL Web App Anda

function cekKupon() {
  const id = document.getElementById("idInput").value.trim();
  const kupon = document.getElementById("kuponInput").value.trim();

  if (!id || !kupon) {
    document.getElementById("hasil").textContent = "ID dan kupon wajib diisi!";
    return;
  }

  const url = `${apiUrl}?id=${encodeURIComponent(id)}&kupon=${encodeURIComponent(kupon)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "valid") {
        document.getElementById("hasil").textContent = "✅ Kupon valid! Silakan buka hadiah.";
      } else if (data.status === "used") {
        document.getElementById("hasil").textContent = "⚠️ Kupon sudah digunakan.";
      } else {
        document.getElementById("hasil").textContent = "❌ ID atau kupon tidak cocok.";
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      document.getElementById("hasil").textContent = "Terjadi kesalahan saat menghubungi server.";
    });
}

