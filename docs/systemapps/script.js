let startX = null;
let startY = null;

function handleTouchStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startY = e.touches ? e.touches[0].clientY : e.clientY;
}

function handleTouchEnd(e) {
    if (!startX || !startY) return;

    let endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    let endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    let diffX = startX - endX;
    let diffY = startY - endY;

    const isLockscreen = document.querySelector('.lockscreen-bg') !== null;
    const isHomescreen = document.querySelector('.homescreen-container') !== null;

    // Logic Lockscreen
    if (isLockscreen) {
        if (diffY > 60) { // Swipe up
            window.location.href = 'index.html';
        }
    }

    // Logic Homescreen
    if (isHomescreen) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX < -50) {
                // Swipe ke kanan buka Widgets
                document.getElementById('ws').classList.add('show');
            } else if (diffX > 50) {
                // Swipe ke kiri tutup Widgets
                document.getElementById('ws').classList.remove('show');
            }
        } else {
            // Vertical swipe
            if (diffY > 50) {
                // Swipe atas: buka Control Center atau tutup Notification Center
                if (document.getElementById('nc').classList.contains('show')) {
                    document.getElementById('nc').classList.remove('show');
                } else {
                    document.getElementById('cc').classList.add('show');
                }
            } else if (diffY < -50) {
                // Swipe bawah: buka Notif Center atau tutup Control Center
                if (document.getElementById('cc').classList.contains('show')) {
                    document.getElementById('cc').classList.remove('show');
                } else {
                    document.getElementById('nc').classList.add('show');
                }
            }
        }
    }

    startX = null;
    startY = null;
}

document.body.addEventListener('touchstart', handleTouchStart);
document.body.addEventListener('touchend', handleTouchEnd);
document.body.addEventListener('mousedown', handleTouchStart); // fix mousedown
document.body.addEventListener('mouseup', handleTouchEnd); // fix mouseup

// Update Jam & Tanggal
function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');

    // Buat Lockscreen
    const clock = document.querySelector('.clock');
    if (clock) clock.textContent = `${hours}:${minutes}`;
    
    const date = document.querySelector('.date');
    if (date) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        date.textContent = `${now.toLocaleDateString('en-US', options)}`;
    }

    // Buat Homescreen Status Bar
    const hsTime = document.getElementById('time');
    if (hsTime) hsTime.textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock();

// Logic Toggle Control Center
document.querySelectorAll('.cc-btn, .cc-btn-tool').forEach(button => {
    button.addEventListener('click', function() {
        // Toggle class 'active'
        this.classList.toggle('active');
        
        // Opsional: Kasih feedback warna langsung lewat JS kalau mau spesifik
        if (this.classList.contains('active')) {
            if (this.querySelector('ion-icon').name === 'wifi' || 
                this.querySelector('ion-icon').name === 'bluetooth') {
                this.style.backgroundColor = '#fff';
                this.style.color = 'black';
                this.style.borderColor = '#fff';
            } else {
                this.style.backgroundColor = '#fff';
                this.style.color = '#333';
            }
        } else {
            // Balikin ke style awal
            this.style.backgroundColor = '';
            this.style.color = '';
            this.style.borderColor = '';
        }
    });
});