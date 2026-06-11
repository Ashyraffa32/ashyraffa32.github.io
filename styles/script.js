// Target waktu uji coba masif: 1 September 2026
const targetLockdownDate = new Date("September 1, 2026 00:00:00").getTime();

const runAndroidTimer = setInterval(function() {
    const currentTime = new Date().getTime();
    const timeDiff = targetLockdownDate - currentTime;

    // Kalkulasi matematika untuk konversi waktu
    const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const h = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Suntik hasil ke elemen HTML (wajib pakai dua digit)
    document.getElementById("indie-days").innerText = d.toString().padStart(2, '0');
    document.getElementById("indie-hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("indie-minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("indie-seconds").innerText = s.toString().padStart(2, '0');

    // Jika waktu habis (September 2026)
    if (timeDiff < 0) {
        clearInterval(runAndroidTimer);
        document.querySelector(".indie-timer").innerText = "SISTEM DIKUNCI / LOCKED OUT";
        document.querySelector(".indie-title").innerText = "ANDROID ECOSYSTEM CLOSED";
    }
}, 1000);

