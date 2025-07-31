<script>
  document.getElementById('tombol-hadiah').addEventListener('click', function () {
    const hadiahDiv = document.getElementById('daftar-hadiah');
    hadiahDiv.style.display = hadiahDiv.style.display === 'flex' ? 'none' : 'flex';
  });
</script>

  <!-- Kotak tulisan "KLIK UNTUK DIBUKA" satu kotak di tengah -->
  <div id="instructionBox" style="display:none;">
    KLIK UNTUK DIBUKA
  </div>
<!-- Menu gambar pojok kiri -->
<div id="menuGambar">
  <a href="https://script.google.com/macros/s/AKfycbyzL5aKyVs2rZWstQH-SXe3PRk4MoqKhfdFPGWvheR21OdA8sXG1OzadCGyrVDjhJqp5A/exec">
    <img src="https://i.ibb.co/cKhbs4vz/Untitled-1.gif" alt="Back" width="1000" height="1000">
  </a>
</div>
  <!-- Canvas untuk efek bintang -->
  <canvas id="starCanvas"></canvas>
  
<!-- Bagian Cara Bermain -->
<h3>📌Cara Bermain Mistery Box</h3>
<div id="howToPlay" style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
  <div class="image-box">
    <img src="https://i.ibb.co/60wwMpYH/6163570561784071923.jpg" alt="Langkah 1" style="width: 144px; height: 320px; border-radius: 8px;">
    <p>📌Langkah 1: Masukkan ID yang Valid serta kode kupon untuk memulai permainan.</p>
  </div>
  <div class="image-box">
    <img src="https://i.ibb.co/YB6Nxzvt/6163570561784071925.jpg" alt="Langkah 2" style="width: 144px; height: 320px; border-radius: 8px;">
    <p>📌Langkah 2: Pilih salah satu Mistery Box dan menangkan hadiah.</p>
  </div>
    <div class="image-box">
    <img src="https://i.ibb.co/C5Wqy5Jx/6163570561784071924.jpg" alt="Langkah 3" style="width: 144px; height: 320px; border-radius: 8px;">
    <p>📌Langkah 3: Hasil Mistery Box wajib share ke Grup Telegram untuk claim hadiah.</p>
  </div>
</div>
  <div id="result"></div>

<!-- Tambahkan ini di dalam <body> -->
<div class="klaim-bonus-topright">
  <a href="https://t.me/freebetbelegendwin" target="_blank" class="klaim-bonus-btn">
    🎁 KLAIM BONUS DISINI
  </a>
</div>

<!-- Start of LiveChat (www.livechat.com) code -->
<script>
    window.__lc = window.__lc || {};
    window.__lc.license = 11778162;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";
    ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
</script>
<noscript><a href="https://www.livechat.com/chat-with/11778162/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
<!-- End of LiveChat code -->

  <!-- Popup Overlay -->
  <div id="popupOverlay">
    <div id="popupContent">
      <h2>Hadiah Mystery Box</h2>
      <table id="hadiahTable">
        <thead>
          <tr>
            <th>No</th>
            <th>Hadiah</th>
          </tr>
        </thead>
        <tbody>
          <!-- Baris hadiah akan dibuat JS -->
        </tbody>
      </table>
      <button id="closePopup">Tutup</button>
    </div>
  </div>

  <audio id="clickSound" src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg" preload="auto"></audio>

  <script>
    let hadiahList = [1000, 2000, 3000, 5000, 8000, 10000, 100000, 1000000, 10000000]; // 9 item
    let rowIndex = null;
    let sudahPilih = false;
    let selectedBox = null;

    const clickSound = document.getElementById('clickSound');

    function verifikasi() {
      const id = document.getElementById('id').value.trim();
      const kupon = document.getElementById('kupon').value.trim();
      if (!id || !kupon) {
        alert("Masukkan ID dan Kupon!");
        return;
      }

      google.script.run.withSuccessHandler(function(res) {
        if (res.status === 'valid') {
          rowIndex = res.row;
          document.getElementById('form').style.display = 'none';
          document.getElementById('boxContainer').style.display = 'grid';
          document.getElementById('instructionBox').style.display = 'block';
          mulaiBox();
        } else if (res.status === 'used') {
          alert('Kupon sudah digunakan.');
        } else {
          alert('ID atau kupon tidak valid.');
        }
      }).checkCoupon(id, kupon);
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
        div.textContent = "";  // kosong, tulisan ada di bawah kotak saja
        div.onclick = function() {
          if (sudahPilih) return;
          sudahPilih = true;
          selectedBox = div;
          clickSound.play();
          bukaKotak(div);
        };
        boxContainer.appendChild(div);
      }
    }

    // Efek bintang
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const groupCount = 20;
    const groups = [];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createStar(x, y, radius, points = 5) {
      const step = Math.PI / points;
      ctx.beginPath();
      for (let i = 0; i < 2 * points; i++) {
        const angle = i * step;
        const r = i % 2 === 0 ? radius : radius / 2;
        ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
    }

    for (let i = 0; i < groupCount; i++) {
      const starCount = Math.floor(random(10, 20));
      const stars = [];

      const baseX = random(0, width);
      const baseY = random(0, height);

      for (let j = 0; j < starCount; j++) {
        stars.push({
          x: baseX + random(-50, 50),
          y: baseY + random(-50, 50),
          dx: random(-0.3, 0.3),
          dy: random(-0.3, 0.3),
          size: random(3, 6)
        });
      }

      groups.push(stars);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      groups.forEach(stars => {
        stars.forEach((star, idx) => {
          star.x += star.dx;
          star.y += star.dy;

          if (star.x < 0 || star.x > width) star.dx *= -1;
          if (star.y < 0 || star.y > height) star.dy *= -1;

          ctx.fillStyle = 'rgba(255, 45, 33, 0.9)';
          createStar(star.x, star.y, star.size, 5);
        });

        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const a = stars[i];
            const b = stars[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 100) {
              ctx.strokeStyle = 'rgba(107, 107, 127, 0.4)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    function bukaKotak(box) {
  // Dapatkan daftar hadiah di bawah 10000
  const hadiahBawah10000 = hadiahList.filter(h => h < 10000);
  
  // Pilih hadiah random dari hadiah bawah 10000
  const hadiahTerpilih = hadiahBawah10000[Math.floor(Math.random() * hadiahBawah10000.length)];

  box.classList.add('selected');
  box.textContent = Rp ${hadiahTerpilih.toLocaleString()};
  box.style.borderColor = '#ffd700';

  // Tampilkan popup hadiah
  buatPopup(hadiahTerpilih);

  // Simpan hasil ke GAS
  google.script.run.simpanHasil(rowIndex, hadiahTerpilih);
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
        tdHadiah.textContent = Rp ${h.toLocaleString()};
        if (h === hadiahTerpilih) {
          tdHadiah.classList.add('selected-cell');
        }

        tr.appendChild(tdNo);
        tr.appendChild(tdHadiah);
        tbody.appendChild(tr);
      });

      popup.style.display = 'flex';

      document.getElementById('closePopup').onclick = function() {
        popup.style.display = 'none';
        bukaHadiahLain(hadiahTerpilih);
      };
    }

    function bukaHadiahLain(hadiahTerpilih) {
      const boxes = document.querySelectorAll('.box');
      boxes.forEach(box => {
        if (!box.classList.contains('selected')) {
          box.classList.add('opened');
          box.textContent = Rp ${parseInt(box.dataset.hadiah).toLocaleString()};
          box.style.borderColor = 'rgba(255, 215, 0, 0.5)';
        }
      });
    }

    // Fungsi shuffle Fisher-Yates
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
     // Toggle menu tampil/sembunyi
    document.getElementById("mainMenuBtn").addEventListener("click", function () {
      const menu = document.getElementById("floatingMenu");
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

  </script>
