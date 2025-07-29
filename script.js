const scriptURL = "https://script.google.com/macros/s/AKfycbz18VrmRMZgmFiukKbJveShsJdynNa9SeFpae_CgRur1_jIRwbDQGWQJ6uL9IJhbiLO/exec"; // Ganti dengan URL Web App GAS kamu

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert("Gagal: " + err));
});
