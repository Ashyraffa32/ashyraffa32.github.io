let timerInterval;
let secondsElapsed = 0;
const timerElement = document.getElementById('video-timer');
const videoElement = document.getElementById('camera-stream');
const canvasElement = document.getElementById('photo-canvas');
const shutterBtn = document.getElementById('shutter-btn');
const galleryPreview = document.getElementById('gallery-preview');

let currentStream = null;
let facingMode = "environment"; // Default kamera belakang (environment)
let currentMode = "photo"; // 'photo' atau 'video'

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// 1. Fungsi buat nyalain kamera
async function startCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facingMode },
            audio: true // Audio penting buat mode video
        });
        currentStream = stream;
        videoElement.srcObject = stream;
    } catch (err) {
        console.error("Gagal akses kamera:", err);
        alert("In order to use Camera, the app need access to your camera.");
    }
}

// 2. Ganti mode Foto / Video
function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.camera-modes span').forEach(el => el.classList.remove('active'));
    document.getElementById(`mode-${mode}`).classList.add('active');

    if (mode === 'video') {
        shutterBtn.classList.add('video-mode');
    } else {
        shutterBtn.classList.remove('video-mode');
        shutterBtn.classList.remove('recording');
        if (isRecording) stopRecording();
    }
}

// 3. Jepret Foto atau Rekam Video (tergantung mode)
function takeAction() {
    if (currentMode === 'photo') {
        takePhoto();
    } else if (currentMode === 'video') {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }
}

// --- LOGIKA FOTO ---
function takePhoto() {
    // Animasi flash layar (bikin layar putih sedetik)
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0'; flash.style.left = '0'; flash.style.width = '100%'; flash.style.height = '100%';
    flash.style.background = '#fff'; flash.style.zIndex = '100'; flash.style.transition = 'opacity 0.3s';
    document.body.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; setTimeout(() => flash.remove(), 300); }, 50);

    // Ambil gambar dari video masukin ke canvas
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Ubah jadi image URL dan taro di thumbnail gallery pojok kiri
    const dataUrl = canvasElement.toDataURL('image/png');
    galleryPreview.style.backgroundImage = `url(${dataUrl})`;
    
    // Otomatis download fotonya (Biar kerasa beneran kepake)
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `IMG_${Date.now()}.png`;
    a.click();
}

// --- LOGIKA VIDEO ---
function startRecording() {
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(currentStream);
    
    // --- LOGIKA TIMER MULAI ---
    secondsElapsed = 0;
    timerElement.innerText = "00:00:00";
    timerElement.classList.add('active'); // Munculin timernya
    
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const hrs = Math.floor(secondsElapsed / 3600).toString().padStart(2, '0');
        const mins = Math.floor((secondsElapsed % 3600) / 60).toString().padStart(2, '0');
        const secs = (secondsElapsed % 60).toString().padStart(2, '0');
        timerElement.innerText = `${hrs}:${mins}:${secs}`;
    }, 1000);
    // ---------------------------

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VID_${Date.now()}.mp4`;
        a.click();
    };

    mediaRecorder.start();
    isRecording = true;
    shutterBtn.classList.add('recording');
}

function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
    shutterBtn.classList.remove('recording');

    // --- STOP & RESET TIMER ---
    clearInterval(timerInterval);
    timerElement.classList.remove('active'); // Sembunyiin lagi
}

// 4. Bolak-balik Kamera Depan/Belakang
function flipCamera() {
    facingMode = facingMode === "user" ? "environment" : "user";
    startCamera();
}

// Langsung nyalain pas buka web
window.onload = startCamera;