const text = "Barakallah Fii Umrik, Sayang❤️. Di bulan Ramadan yang penuh berkah ini, aku berdoa semoga Allah memberkahi sisa usiamu dan mengabulkan setiap doamu. Sebagai kejutan kecil, ada 'THR Milad' buat kamu. Silakan dibuka ya! ❤️🌙";
const items = ["emas.png", "rumah.png", "mobil.png", "motor.png", "ketupat.png", "boneka.png", "kue.png", "voucher.png", "iphone-pink.png"];

// DATA SLIDER FOTO
const memoriData = [
    { img: "img8.jpg", text: "😸" },
    { img: "img5.jpg", text: "❤️" },
    { img: "img13.jpg", text: "❤️" },
    { img: "img15.jpg", text: "❤️" },
    { img: "img16.jpg", text: "❤️" },
    { img: "img14.jpg", text: "❤️" },
    { img: "img10.jpg", text: "❤️" },
    { img: "img17.jpg", text: "❤️" },
];

let i = 0;
let idxFoto = 0;

// Fungsi buat bikin kunang-kunang cahaya di SELURUH Halaman
function initGlobalLights() {
    // Kita tempel ke body
    const body = document.body;
    for (let k = 0; k < 25; k++) {
        const light = document.createElement('div');
        light.className = 'floating-light';
        
        // Posisi random horizontal
        light.style.left = Math.random() * 100 + 'vw';
        
        // Kecepatan dan delay random biar gak barengan munculnya
        light.style.animationDuration = (Math.random() * 7 + 5) + 's';
        light.style.animationDelay = (Math.random() * 5) + 's';
        
        // Ukuran sedikit bervariasi biar estetik
        const size = Math.random() * 3 + 1 + 'px';
        light.style.width = size;
        light.style.height = size;

        body.appendChild(light);
    }
}

// Panggil fungsinya langsung
initGlobalLights();

function transitionCard(currentId, nextId) {
    const currentCard = document.getElementById(currentId);
    const nextCard = document.getElementById(nextId);
    currentCard.classList.add('exit');
    setTimeout(() => {
        currentCard.style.display = 'none';
        currentCard.classList.remove('exit', 'active');
        nextCard.style.display = 'flex';
        setTimeout(() => nextCard.classList.add('active'), 10);
    }, 500);
}

function bukaBerkah() {
    document.getElementById('bgm').play().catch(() => {});
    document.getElementById('sfxOpen').play();
    document.getElementById('overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        const ucapan = document.getElementById('cardUcapan');
        ucapan.style.display = 'flex';
        setTimeout(() => ucapan.classList.add('active'), 10);
        typeWriter();
    }, 1000);
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

function gantiFoto(n) {
    idxFoto += n;
    if (idxFoto >= memoriData.length) idxFoto = 0;
    if (idxFoto < 0) idxFoto = memoriData.length - 1;
    const imgEl = document.getElementById('imgMemori');
    const txtEl = document.getElementById('txtMemori');
    imgEl.parentElement.classList.remove('fade-anim');
    void imgEl.parentElement.offsetWidth; // Trigger reflow
    imgEl.parentElement.classList.add('fade-anim');
    imgEl.src = `img/${memoriData[idxFoto].img}`;
    txtEl.innerHTML = `"${memoriData[idxFoto].text}"`;
}

function keMemori() { transitionCard('cardUcapan', 'cardMemori'); gantiFoto(0); }
function keGacha() { transitionCard('cardMemori', 'cardGacha'); }

function putarTHR() {
    const btn = document.getElementById('btnSpin');
    const display = document.getElementById('displayGacha');
    const reaksi = document.getElementById('reaksi');
    
    btn.disabled = true;
    btn.innerText = "Sedang Mencari Berkah.";
    reaksi.innerText = "Sabar ya sayang, doa dulu✨";

    // 1. Durasi Acak Gambar (Interval)
    let shuffle = setInterval(() => {
        const item = items[Math.floor(Math.random() * items.length)];
        display.innerHTML = `<img src="img/${item}" style="width:70px; filter: blur(1px);">`;
    }, 100);

    // 2. Ubah teks di tengah jalan biar gak bosen (setelah 5 detik)
    setTimeout(() => {
        reaksi.innerText = "Hampir dapet nih! Kira-kira apa ya...🤔";
    }, 5000);

    // 3. STOP Gacha setelah 10 Detik (10000 ms)
    setTimeout(() => {
        clearInterval(shuffle);
        
        // Hasil akhir (Iphone 13 Alpine Green)
        display.innerHTML = `<img src="img/iphone-pink.png" style="width:100px; filter: drop-shadow(0 0 15px gold); animation: pulse 1s infinite">`;
        
        reaksi.innerHTML = "MasyaAllah! Kamu dapet <br><b>iPhone 13✨</b>";
        
        document.getElementById('sfxWin').play();
        btn.style.display = 'none';
        document.getElementById('btnSelesai').style.display = 'block';
    }, 10000); // Durasi 10 detik
}

function tampilPesanAkhir() {
    document.getElementById('btnSelesai').style.display = 'none';
    document.getElementById('pesanPenutup').style.display = 'block';
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
}