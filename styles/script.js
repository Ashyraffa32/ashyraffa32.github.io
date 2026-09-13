// Target waktu uji coba masif: 30 September 2026
const targetLockdownDate = new Date("September 30, 2026 00:00:00").getTime();

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

// ===== THEME SETTINGS MODAL =====

// Get modal elements
const settingsBtn = document.getElementById('settings-btn');
const modal = document.getElementById('settings-modal');
const closeBtn = document.getElementById('close-btn');
const themeRadios = document.querySelectorAll('input[name="theme"]');

// Load saved theme from localStorage when page loads
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('siteTheme') || 'light';
    applyTheme(savedTheme);
    document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;
});

// Open modal when settings button is clicked
settingsBtn.addEventListener('click', function() {
    modal.classList.remove('hidden');
    modal.classList.add('show');
});

// Close modal when X button is clicked
closeBtn.addEventListener('click', function() {
    modal.classList.add('hidden');
    modal.classList.remove('show');
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
    }
});

// Handle theme change
themeRadios.forEach(radio => {
    radio.addEventListener('change', function(e) {
        const selectedTheme = e.target.value;
        applyTheme(selectedTheme);
        localStorage.setItem('siteTheme', selectedTheme);
    });
});

// Function to apply theme
function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('dark-theme', 'inverted-theme');
    
    // Apply selected theme
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'inverted') {
        document.body.classList.add('inverted-theme');
    }
    // 'light' theme is default, no class needed
}

