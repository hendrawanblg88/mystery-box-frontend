const API_URL = "https://script.google.com/macros/s/AKfycbwxVzVCd0qKGNEO-_iJup_EWRLvouBcn8kdxPnQHqYUC1I68FQHt-VBjkesg7T2ZIvqiQ/exec"; // ganti dengan URL kamu

function verifikasi() {
  const id = document.getElementById("id").value.trim();
  const kupon = document.getElementById("kupon").value.trim();

  if (!id || !kupon) {
    alert("ID dan Kupon wajib diisi!");
    return;
  }

  const url = `${API_URL}?mode=cek&id=${encodeURIComponent(id)}&kupon=${encodeURIComponent(kupon)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "valid") {
        alert("Kupon valid! Silakan buka mystery box.");
        // Lanjutkan ke buka box atau tampilkan tombol baru
      } else if (data.status === "used") {
        alert("Kupon sudah digunakan.");
      } else if (data.status === "invalid") {
        alert("Kupon tidak ditemukan.");
      } else {
        alert("Terjadi kesalahan.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Gagal menghubungi server.");
    });
}
