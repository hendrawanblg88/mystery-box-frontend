const API_URL = "https://script.google.com/macros/s/AKfycbx_3SH9blPz4v-wKqtHdFm5CWXJAagYLOHwNNl6IrvNNlCAJXNoemapHuk47Jr0RSbrzQ/exec";

let rowIndex = null;
let hadiahTerpilih = null;
let sudahBuka = false;

const daftarHadiah = [
  "Skin Epic", "100 Diamond", "Skin Normal",
  "Special Border", "Bundle Keren", "50 Diamond",
  "Skin Limited", "Background Premium", "Token Event"
];

function verifikasi() {
  const id = document.getElementById('id').value.trim();
  const kupon = document.getElementById('kupon').value.trim();

  if (!id || !kupon) {
    alert("Masukkan ID dan Kupon!");
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: "checkCoupon",
      id: id,
      kupon: kupon
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.status === 'valid') {
      rowIndex = res.row;
      document.getElementById('form').style.display = 'none';
      document.getElementById('boxContainer').style.display = 'grid';
      document.getElementById('instructionBox').style.display = 'block';
    } else if (res.status === 'used') {
      alert('Kupon sudah digunakan.');
    } else {
      alert('ID atau kupon tidak valid.');
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Gagal menghubungi server.");
  });
}

function bukaKotak(element) {
  if (sudahBuka) return;

  sudahBuka = true;
  element.classList.add('opened');
  hadiahTerpilih = daftarHadiah[Math.floor(Math.random() * daftarHadiah.length)];

  document.getElementById('resultBox').innerText = "Selamat! Kamu mendapatkan: " + hadiahTerpilih;

  simpanHasilKeServer(rowIndex, hadiahTerpilih);
}

function simpanHasilKeServer(row, hadiah) {
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: "simpanHasil",
      row: row,
      hadiah: hadiah
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log("Data disimpan:", data);
  })
  .catch(err => {
    console.error("Gagal menyimpan hasil:", err);
  });
}

