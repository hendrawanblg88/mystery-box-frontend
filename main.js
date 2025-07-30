const API_URL = "https://script.google.com/macros/s/AKfycbwxVzVCd0qKGNEO-_iJup_EWRLvouBcn8kdxPnQHqYUC1I68FQHt-VBjkesg7T2ZIvqiQ/exec"; // Ganti jika kamu update

let hadiahList = ["Hadiah A", "Hadiah B", "Hadiah C", "Hadiah D", "Hadiah E", "Hadiah F", "Hadiah G", "Hadiah H", "Hadiah Spesial"];
let selectedBox = null;
let barisKupon = null; // ditangkap dari hasil validasi
let sudahPilih = false;

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
        barisKupon = data.row;
        document.getElementById("tampilkanBtn").style.display = "block";
      } else if (data.status === "used") {
        alert("Kupon sudah digunakan.");
      } else {
        alert("Kupon tidak ditemukan.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Gagal menghubungi server.");
    });
}

function mulaiBox() {
  shuffle(hadiahList);
  const boxContainer = document.getElementById('boxContainer');
  boxContainer.innerHTML = '';
  sudahPilih = false;
  selectedBox = null;

  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.className = 'box';
    div.dataset.hadiah = hadiahList[i];
    div.dataset.index = i;
    div.textContent = "?";
    div.onclick = function () {
      if (sudahPilih) return;
      sudahPilih = true;
      selectedBox = div;
      bukaKotak(div);
    };
    boxContainer.appendChild(div);
  }
}

function bukaKotak(box) {
  const hadiah = box.dataset.hadiah;
  box.textContent = hadiah;
  box.style.backgroundColor = "#0f0";

  // Simpan hasil ke Google Sheets via GAS
  if (barisKupon && hadiah) {
    const url = `${API_URL}?mode=simpan&row=${barisKupon}&hadiah=${encodeURIComponent(hadiah)}`;
    fetch(url)
      .then(response => response.text())
      .then(data => console.log("Disimpan:", data))
      .catch(err => console.error("Gagal simpan hadiah:", err));
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
