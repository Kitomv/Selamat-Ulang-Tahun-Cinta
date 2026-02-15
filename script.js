const text = "Barakallah Fii Umrik, Sayangku ✨. Di bulan Ramadan yang penuh berkah ini, aku berdoa semoga Allah memberkahi sisa usiamu dan mengabulkan setiap doamu. Sebagai kejutan kecil, ada 'THR Milad' buat kamu. Silakan dibuka ya! ❤️🌙";
const items = ["emas.png", "rumah.png", "mobil.png", "motor.png", "boneka.png", "kue.png", "voucher.png", "iphone-green.png"];
let i = 0;

function initOverlayLights() {
    const overlay = document.getElementById('overlay');
    for (let k = 0; k < 15; k++) {
        const light = document.createElement('div');
        light.className = 'floating-light';
        light.style.left = Math.random() * 100 + 'vw';
        light.style.animationDuration = (Math.random() * 5 + 5) + 's';
        light.style.animationDelay = (Math.random() * 5) + 's';
        overlay.appendChild(light);
    }
}
initOverlayLights();

function bukaBerkah() {
    const bgm = document.getElementById('bgm');
    bgm.volume = 0.5;
    bgm.play().catch(() => {});
    document.getElementById('sfxOpen').play();
    document.getElementById('overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('cardUcapan').style.display = 'flex';
        typeWriter();
    }, 1200);
}

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 45);
    } else {
        document.getElementById('btnLanjut').style.display = 'block';
    }
}

function keMemori() {
    document.getElementById('cardUcapan').style.display = 'none';
    document.getElementById('cardMemori').style.display = 'flex';
}

function keGacha() {
    document.getElementById('cardMemori').style.display = 'none';
    document.getElementById('cardGacha').style.display = 'flex';
}

function putarTHR() {
    const btn = document.getElementById('btnSpin');
    const display = document.getElementById('displayGacha');
    btn.disabled = true;
    btn.innerText = "Mencari Berkah...";

    let shuffle = setInterval(() => {
        const item = items[Math.floor(Math.random() * items.length)];
        display.innerHTML = `<img src="img/${item}" style="width:70px; animation:pulse 0.2s infinite">`;
    }, 100);

    setTimeout(() => {
        clearInterval(shuffle);
        display.innerHTML = `<img src="img/iphone-green.png" style="width:100px; filter: drop-shadow(0 0 15px gold); animation: pulse 1s infinite">`;
        document.getElementById('reaksi').innerHTML = "MasyaAllah! Kamu dapet <br><b>iPhone 13 Alpine Green ✨</b>";
        document.getElementById('sfxWin').play();
        btn.style.display = 'none';
        document.getElementById('btnSelesai').style.display = 'block';
    }, 4000);
}

function tampilPesanAkhir() {
    document.getElementById('btnSelesai').style.display = 'none';
    document.getElementById('pesanPenutup').style.display = 'block';
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}