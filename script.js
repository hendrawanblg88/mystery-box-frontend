async function mulaiGame() {
  const id = document.getElementById('id').value.trim();
  const kupon = document.getElementById('kupon').value.trim();
  const pesan = document.getElementById('pesan');
  
  if (!id || !kupon) {
    pesan.textContent = "ID dan Kupon wajib diisi.";
    return;
  }

  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbz18VrmRMZgmFiukKbJveShsJdynNa9SeFpae_CgRur1_jIRwbDQGWQJ6uL9IJhbiLO/exec?check=1&id=${encodeURIComponent(id)}&kupon=${encodeURIComponent(kupon)}`);
    const data = await res.json();

    if (data.status === "valid") {
      pesan.textContent = "Kupon valid! Menampilkan hadiah...";
      // lanjutkan game, atau tampilkan animasi
    } else if (data.status === "used") {
      pesan.textContent = "Kupon sudah digunakan!";
    } else {
      pesan.textContent = "Kupon tidak valid!";
    }
  } catch (error) {
    console.error(error);
    pesan.textContent = "Terjadi kesalahan saat menghubungi server.";
  }
}
