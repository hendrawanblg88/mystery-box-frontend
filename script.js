let hadiahList = [1000, 2000, 3000, 5000, 8000, 10000, 100000, 1000000, 10000000];
let rowIndex = null;
let sudahPilih = false;
let selectedBox = null;
const clickSound = document.getElementById('clickSound');

// Ganti ini dengan URL Web App kamu dari GAS
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyzL5aKyVs2rZWstQH-SXe3PRk4MoqKhfdFPGWvheR21OdA8sXG1OzadCGyrVDjhJqp5A/exec';

function verifikasi() {
  const id = document.getElementById('id').value.trim();
  const kupon = document.getElementById('kupon').value.trim();

  if (!id || !kupon) {
    alert("Masukkan ID dan Kupon!");
    return;
  }

  fetch(GAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mode: 'verifikasi', id, kupon })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'valid') {
      rowIndex = data.row;
      document.getElementById('form').style.display = 'none';
      document.getElementById('boxContainer').style.display = 'grid';
      document.getElementById('instructionBox').style.display = 'block';
      mulaiBox();
    } else if (data.status === 'used') {
      alert('Kupon sudah digunakan.');
    } else {
      alert('ID atau kupon tidak valid.');
    }
  })
  .catch(err => {
    console.error('Gagal verifikasi:', err);
    alert('Terjadi kesalahan saat memverifikasi.');
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
    div.textContent = '';
    div.onclick = function () {
      if (sudahPilih) return;
      sudahPilih = true;
      selectedBox = div;
      clickSound.play();
      bukaKotak(div);
    };
    boxContainer.appendChild(div);
  }
}

function bukaKotak(box) {
  const hadiahBawah10000 = hadiahList.filter(h => h < 10000);
  const hadiahTerpilih = hadiahBawah10000[Math.floor(Math.random() * hadiahBawah10000.length)];

  box.classList.add('selected');
  box.textContent = `Rp ${hadiahTerpilih.toLocaleString()}`;
  box.style.borderColor = '#ffd700';

  // Simpan hasil ke Google Apps Script
  fetch(GAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mode: 'simpan',
      row: rowIndex,
      hadiah: hadiahTerpilih
    })
  });

  buatPopup(hadiahTerpilih);
}

function buatPopup(hadiahTerpilih) {
  const popup = document.getElementById('popupOverlay');
  const tbody = document.querySelector('#hadiahTable tbody');
  tbody.innerHTML = '';

  hadiahList.forEach((h, i) => {
    const tr = document.createElement('tr');
    const tdNo = document.createElement('td');
    tdNo.textContent = i + 1;

    const tdHadiah = document.createElement('td');
    tdHadiah.textContent = `Rp ${h.toLocaleString()}`;
    if (h === hadiahTerpilih) {
      tdHadiah.classList.add('selected-cell');
    }

    tr.appendChild(tdNo);
    tr.appendChild(tdHadiah);
    tbody.appendChild(tr);
  });

  popup.style.display = 'flex';

  document.getElementById('closePopup').onclick = function () {
    popup.style.display = 'none';
    bukaHadiahLain();
  };
}

function bukaHadiahLain() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    if (!box.classList.contains('selected')) {
      box.classList.add('opened');
      box.textContent = `Rp ${parseInt(box.dataset.hadiah).toLocaleString()}`;
      box.style.borderColor = 'rgba(255, 215, 0, 0.5)';
    }
  });
}

// Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Toggle floating menu
document.getElementById("mainMenuBtn").addEventListener("click", function () {
  const menu = document.getElementById("floatingMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

// Toggle daftar hadiah
document.getElementById('tombol-hadiah').addEventListener('click', function () {
  const hadiahDiv = document.getElementById('daftar-hadiah');
  hadiahDiv.style.display = hadiahDiv.style.display === 'flex' ? 'none' : 'flex';
});
