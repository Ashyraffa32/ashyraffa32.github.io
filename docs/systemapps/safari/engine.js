const safariInput = document.getElementById('safari-input');
const safariFrame = document.getElementById('safari-frame');

// Array buat nyimpen jejak URL lu
let historyStack = ['https://www.google.com/?igu=1'];
let currentIndex = 0;

// Fungsi buat load URL ke iframe sekalian update tulisan di address bar
function loadUrl(url) {
    // 1. Set source iframe
    safariFrame.src = url;
    
    // 2. Bersihin URL buat ditampilin di Address Bar
    let displayUrl = "";
    
    if (url.includes('.html')) {
        // Kalau file lokal (misal: favorites.html), tampilin nama filenya aja
        displayUrl = url.replace('.html', '');
        // Bikin huruf depan gede (Favorites)
        displayUrl = displayUrl.charAt(0).toUpperCase() + displayUrl.slice(1);
    } else {
        // Kalau web luar, ambil domain utamanya aja kayak Safari asli
        // https://www.google.com/search?q=omori -> google.com
        displayUrl = url.replace(/^https?:\/\//, '') // Buang http:// atau https://
                       .replace('www.', '')           // Buang www.
                       .split('/')[0];               // Ambil sebelum tanda / pertama
    }

    safariInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let url = safariInput.value.trim();

        if (!url.includes('.')) {
            url = `https://www.google.com/search?q=${url}&igu=1`;
        } else {
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
        }

        // Simpan history & load (sama kayak logic lama lu)
        historyStack = historyStack.slice(0, currentIndex + 1);
        historyStack.push(url);
        currentIndex++;

        loadUrl(url); // Manggil fungsi loadUrl yang udah pinter tadi
        safariInput.blur();
    }
});

    // 3. Update teks di input address bar
    safariInput.value = displayUrl;
}

// Fungsi ngetik dan enter
safariInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let url = safariInput.value.trim();

        // Kalau cuma ngetik kata biasa, lempar ke Google Search
        if (!url.includes('.')) {
            url = `https://www.google.com/search?q=${url}&igu=1`;
        } else {
            // Pastiin ada protocol https-nya
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
        }

        // Kalau lu ngetik web baru pas lagi di posisi "back", history depannya harus dibuang
        historyStack = historyStack.slice(0, currentIndex + 1);
        
        // Masukin web baru ke history
        historyStack.push(url);
        currentIndex++;

        loadUrl(url);
        safariInput.blur(); // Umpetin keyboard
    }
});

// Fungsi Reload
function reloadSafari() {
    loadUrl(historyStack[currentIndex]);
}

// Fungsi Back
function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        loadUrl(historyStack[currentIndex]);
    } else {
        console.log("Nada.");
    }
}

// Fungsi Forward
function goForward() {
    if (currentIndex < historyStack.length - 1) {
        currentIndex++;
        loadUrl(historyStack[currentIndex]);
    } else {
        console.log("Nada.");
    }
}