const apiUrl = "https://script.google.com/macros/s/AKfycbx_3SH9blPz4v-wKqtHdFm5CWXJAagYLOHwNNl6IrvNNlCAJXNoemapHuk47Jr0RSbrzQ/exec";

function cekKupon() {
  const id = document.getElementById("id").value.trim();
  const kupon = document.getElementById("kupon").value.trim();

  if (!id || !kupon) {
    document.getElementById("hasil").textContent = "ID dan kupon wajib diisi!";
    return;
  }

  const url = `${apiUrl}?id=${encodeURIComponent(id)}&kupon=${encodeURIComponent(kupon)}`;
  const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);

  fetch(proxyUrl)
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
