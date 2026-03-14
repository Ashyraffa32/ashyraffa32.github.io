// 1. DATA FOTO BAWAAN (Default Photos)
const defaultPhotos = [
    {
        src: "memories/aubrey1.jpg", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey2.png", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey3.png", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey4.jpg", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey5.jpg", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey6.jpg", // Ganti ini pake path foto Aubrey lu
        date: "1996",
        timestamp: 1689120000000
    },
        {
        src: "memories/aubrey7.jpg", // Ganti ini pake path foto Aubrey lu
        date: "1991",
        timestamp: 1689120000000
    },
            {
        src: "memories/aubrey8.png", // Ganti ini pake path foto Aubrey lu
        date: "1991",
        timestamp: 1689120000000
    },
            {
        src: "memories/aubrey9.png", // Ganti ini pake path foto Aubrey lu
        date: "1991",
        timestamp: 1689120000000
    },
            {
        src: "memories/aubrey10.png", // Ganti ini pake path foto Aubrey lu
        date: "1991",
        timestamp: 1689120000000
    },
];

// 2. CEK LOCAL STORAGE
let photoGallery = JSON.parse(localStorage.getItem('ios_photos'));

// Kalau di storage bener-bener kosong (baru pertama buka), masukin foto bawaan
if (!photoGallery || photoGallery.length === 0) {
    photoGallery = defaultPhotos;
    localStorage.setItem('ios_photos', JSON.stringify(photoGallery));
}

let currentViewingIndex = -1;

// --- SISA FUNGSI RENDER DLL TETEP SAMA KAYAK SEBELUMNYA ---
function renderGallery() {
    const container = document.getElementById('moments-container');
    container.innerHTML = "";

    // Sortir biar yang terbaru di atas
    photoGallery.sort((a, b) => b.timestamp - a.timestamp);

    const groups = {};
    photoGallery.forEach((photo, index) => {
        if (!groups[photo.date]) groups[photo.date] = [];
        groups[photo.date].push({ ...photo, index });
    });

    for (const date in groups) {
        const section = document.createElement('div');
        section.className = 'moment-section';
        section.innerHTML = `
            <div class="moment-header">
                <span class="moment-location">Your Photos</span>
                <span class="moment-date">${date}</span>
            </div>
            <div class="grid">
                ${groups[date].map(p => `
                    <div class="grid-item" 
                         style="background-image: url(${p.src})" 
                         onclick="openViewer(${p.index})">
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    }
}

function openViewer(index) {
    currentViewingIndex = index;
    const photo = photoGallery[index];
    
    const viewer = document.getElementById('photo-viewer');
    const fullImg = document.getElementById('full-img');
    const dateLabel = document.getElementById('viewer-date');

    // Masukin sumber fotonya
    fullImg.src = photo.src;
    dateLabel.innerText = photo.date;

    // Munculin overlay-nya
    viewer.classList.remove('hidden');
    
    // Lock scroll body biar nggak goyang pas liat foto
    document.body.style.overflow = 'hidden';
}

function closeViewer() {
    const viewer = document.getElementById('photo-viewer');
    viewer.classList.add('hidden');
    
    // Balikin scroll body
    document.body.style.overflow = 'auto';
}

// ... (Data defaultPhotos & logic awal tetep sama) ...

// --- FUNGSI UPLOAD (WAJIB ADA) ---
function triggerUpload() {
    document.getElementById('file-input').click();
}

function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Cek ukuran biar localStorage gak jebol (Base64 itu berat bre)
    if (file.size > 2 * 1024 * 1024) {
        alert("Kegedean filenya! Cari yang di bawah 2MB biar gak lag.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const newPhoto = {
            src: e.target.result,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            timestamp: Date.now()
        };

        photoGallery.unshift(newPhoto);
        saveToStorage();
        renderGallery();
    };
    reader.readAsDataURL(file);
}

function saveToStorage() {
    try {
        localStorage.setItem('ios_photos', JSON.stringify(photoGallery));
    } catch (e) {
        alert("iPhone Storage Full");
    }
}

// --- UPLOAD DENGAN AUTO-COMPRESS BIAR STORAGE GA JEBOL ---
function triggerUpload() {
    document.getElementById('file-input').click();
}

function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Kita bikin canvas buat kompres gambar
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            // Logika resize proporsional
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert ke jpeg dengan kualitas 70% biar ringan parah
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

            const newPhoto = {
                src: compressedDataUrl,
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                timestamp: Date.now()
            };

            photoGallery.unshift(newPhoto);
            saveToStorage();
            renderGallery();
            
            // Reset input biar bisa upload foto yg sama 2x
            document.getElementById('file-input').value = '';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function saveToStorage() {
    try {
        localStorage.setItem('ios_photos', JSON.stringify(photoGallery));
    } catch (e) {
        showCustomAlert("iPhone Storage Full", "You can free up some space on this iPhone by managing your storage in Settings.", "OK", closeCustomAlert);
    }
}

// --- VIEWER & DELETE LOGIC (FIXED) ---
function openViewer(index) {
    currentViewingIndex = index;
    const photo = photoGallery[index];
    
    const viewer = document.getElementById('photo-viewer');
    const fullImg = document.getElementById('full-img');
    const dateLabel = document.getElementById('viewer-date');

    fullImg.src = photo.src;
    dateLabel.innerText = photo.date;

    viewer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeViewer() {
    const viewer = document.getElementById('photo-viewer');
    viewer.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function deleteCurrentPhoto() {
    showCustomAlert(
        "Delete Photo", 
        "Are you sure you want to delete this photo?", 
        "Delete", 
        () => {
            photoGallery.splice(currentViewingIndex, 1);
            saveToStorage();
            renderGallery();
            closeViewer();
            closeCustomAlert();
        }
    );
}

// Custom Alert Logic (Tetep sama)
function showCustomAlert(title, message, confirmText, onConfirm) {
    const overlay = document.getElementById('custom-alert-overlay');
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    
    const confirmBtn = document.getElementById('alert-confirm-btn');
    confirmBtn.innerText = confirmText;
    confirmBtn.onclick = onConfirm;

    overlay.classList.remove('hidden');
}

function closeCustomAlert() {
    document.getElementById('custom-alert-overlay').classList.add('hidden');
}

// Initial render
renderGallery();
