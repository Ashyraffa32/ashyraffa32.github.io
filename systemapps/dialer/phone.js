const contacts = [
    "Angel", "Basil", "Charlie", "Hero", "Worst Mom", 
    "Kel", "Kim", "Sunny", "The Maverick", "Vance", "Preacher", "Mincy"
];

let dialedNumber = "";

// 1. Render Kontak
function renderContacts() {
    const container = document.getElementById('contacts-container');
    container.innerHTML = "";
    contacts.sort().forEach(name => {
        const div = document.createElement('div');
        div.className = "contact-row";
        div.innerText = name;
        div.onclick = () => showSimAlert(); // Klik nama juga gak bisa nelpon
        container.appendChild(div);
    });
}

// 2. Tab Switcher
function switchTab(viewName, el) {
    document.querySelectorAll('.phone-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(`view-${viewName}`).classList.add('active');
    el.classList.add('active');
}

// 3. Dialer Logic
function press(num) {
    dialedNumber += num;
    updateDisplay();
}

function backspace() {
    dialedNumber = dialedNumber.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('dialed-number');
    const addBtn = document.getElementById('add-number');
    const delBtn = document.getElementById('backspace');

    display.innerText = dialedNumber;

    if (dialedNumber.length > 0) {
        addBtn.classList.remove('hidden');
        delBtn.classList.remove('hidden');
    } else {
        addBtn.classList.add('hidden');
        delBtn.classList.add('hidden');
    }
}

// 4. Alert Logic
function showSimAlert() {
    document.getElementById('sim-alert-overlay').classList.remove('hidden');
}

function closeSimAlert() {
    document.getElementById('sim-alert-overlay').classList.add('hidden');
}

// Init
renderContacts();