const birthdays = {
    "1-1": "Hero's Birthday 🎂",
    "18-2": "Basil's Birthday 🌻",
    "1-3": "Mari's Birthday 🎹",
    "23-5": "Aubrey's Birthday 🎀",
    "20-7": "Sunny's Birthday 🔪",
    "11-11": "Kel's Birthday 🏀",
    "25-12": "Omori Game Anniversary 💿"
};

let viewDate = new Date(); // Tanggal yang lagi dilihat
let selectedDay = null;

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const title = document.getElementById('monthYearTitle');
    
    const month = viewDate.getMonth();
    const year = viewDate.getFullYear();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    title.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    grid.innerHTML = "";

    // Empty spaces
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="day"></div>`;
    }

    // Days with logic
    for (let d = 1; d <= lastDate; d++) {
        const dateKey = `${d}-${month + 1}`;
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.innerText = d;

        if (birthdays[dateKey]) {
            dayEl.classList.add('is-birthday');
        }

        dayEl.onclick = () => {
            // Remove previous highlight
            document.querySelectorAll('.day').forEach(el => el.classList.remove('active'));
            // Add new highlight
            dayEl.classList.add('active');
            
            // Show event
            const eventBox = document.getElementById('eventDescription');
            if (birthdays[dateKey]) {
                eventBox.innerHTML = `<span style="color:#ff3b30; font-weight:bold;">${d} ${monthNames[month]}:</span><br>${birthdays[dateKey]}`;
            } else {
                eventBox.innerText = "No events today.";
            }
        };

        grid.appendChild(dayEl);
    }
}

function moveMonth(offset) {
    viewDate.setMonth(viewDate.getMonth() + offset);
    renderCalendar();
}

// Start!
renderCalendar();