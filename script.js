const text = "Barakallah Fii Umrik, Sayangku ✨. Di bulan Ramadan yang penuh berkah ini, aku berdoa semoga Allah memberkahi sisa usiamu dan mengabulkan setiap doamu. Sebagai kejutan kecil, ada 'THR Milad' buat kamu. Silakan diputar ya! ❤️🌙";
const items = ["emas.png", "rumah.png", "mobil.png", "motor.png", "boneka.png", "kue.png", "voucher.png", "iphone-pink.png"];
let i = 0;

// Create Floating Lights in Overlay
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
    const sfxOpen = document.getElementById('sfxOpen');

    // 1. Set volume (opsional biar gak kaget)
    bgm.volume = 0.5; 
    
    // 2. Play BGM & SFX Langsung saat klik lantern
    bgm.play().catch(error => {
        console.log("Autoplay dicegah browser, tapi klik ini harusnya sudah cukup.");
    });
    sfxOpen.play();

    // 3. Efek Visual Transisi
    document.getElementById('overlay').style.opacity = '0';
    document.getElementById('overlay').style.pointerEvents = 'none'; // Biar gak bisa diklik lagi

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

function keGacha() {
    document.getElementById('cardUcapan').style.display = 'none';
    document.getElementById('cardGacha').style.display = 'flex';
}

function putarTHR() {
    const btn = document.getElementById('btnSpin');
    const display = document.getElementById('displayGacha');
    btn.disabled = true;
    btn.innerText = "Mencari Berkah...";

    let shuffle = setInterval(() => {
        const item = items[Math.floor(Math.random() * items.length)];
        display.innerHTML = `<img src="img/${item}" style="width:80px; animation:bounce 0.3s infinite">`;
    }, 100);

    setTimeout(() => {
        clearInterval(shuffle);
        // RIGGED: iPhone Alpine Green
        display.innerHTML = `<img src="img/iphone-pink.png" style="width:110px; filter: drop-shadow(0 0 15px gold); animation: pulse 1s infinite">`;
        document.getElementById('reaksi').innerHTML = "MasyaAllah! Kamu dapet <br><b>iPhone 13 ✨</b>";
        document.getElementById('sfxWin').play();
        btn.style.display = 'none';
        document.getElementById('btnSelesai').style.display = 'block';
    }, 4000);
}

function tampilPesanAkhir() {
    document.getElementById('btnSelesai').style.display = 'none';
    document.getElementById('pesanPenutup').style.display = 'block';
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    
    // Mini Fireworks
    for (let k = 0; k < 20; k++) {
        const f = document.createElement('div');
        f.innerHTML = "✨";
        f.style.position = 'fixed';
        f.style.left = Math.random() * 100 + 'vw';
        f.style.top = Math.random() * 100 + 'vh';
        f.style.color = "gold";
        f.style.animation = "fadeAway 1.5s forwards";
        document.body.appendChild(f);
    }
}

// Extra Styles via JS
const style = document.createElement('style');
style.innerHTML = `@keyframes fadeAway { to { opacity: 0; transform: scale(2.5); } }`;
document.head.appendChild(style);