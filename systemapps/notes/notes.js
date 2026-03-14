// 1. Ambil data dari localStorage, kalau kosong pake data default Aubrey
const defaultNotes = [
    { id: 1, title: "Hair dye", body: "Need more pink dye. The current one is fading.", date: "10/20/26" }
];

let notes = JSON.parse(localStorage.getItem('aubrey_notes')) || defaultNotes;
let currentEditingId = null;

const container = document.getElementById('notes-container');
const listView = document.getElementById('notes-list-view');
const editorView = document.getElementById('notes-editor-view');
const textarea = document.getElementById('note-textarea');

// Render daftar catatan di layar utama
function renderNotes() {
    container.innerHTML = "";
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-item';
        div.onclick = () => openNote(note);
        div.innerHTML = `
            <h4>${note.title || "New Note"}</h4>
            <p>${note.date}  ${note.body.substring(0, 30)}...</p>
        `;
        container.appendChild(div);
    });
    document.getElementById('count-text').innerText = `${notes.length} Notes`;
}

// Buka catatan buat diedit
function openNote(note) {
    currentEditingId = note.id;
    listView.classList.add('hidden');
    editorView.classList.remove('hidden');
    textarea.value = note.body;
    document.getElementById('note-timestamp').innerText = `${note.date} at 12:00 PM`;
}

// Balik ke list sambil AUTO-SAVE
function showList() {
    saveNote(); // Tiap balik ke list, otomatis simpan
    editorView.classList.add('hidden');
    listView.classList.remove('hidden');
    renderNotes();
}

// Buat catatan baru
function createNewNote() {
    currentEditingId = Date.now(); // Pake timestamp buat ID unik
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().slice(-2)}`;
    
    const newNote = {
        id: currentEditingId,
        title: "",
        body: "",
        date: dateStr
    };
    
    notes.unshift(newNote); // Tambah ke paling atas
    openNote(newNote);
}

// Fungsi Simpan ke LocalStorage
function saveNote() {
    const content = textarea.value.trim();
    if (content === "" && notes.find(n => n.id === currentEditingId)?.title === "") {
        // Kalau kosong banget, hapus aja dari list
        notes = notes.filter(n => n.id !== currentEditingId);
    } else {
        const noteIndex = notes.findIndex(n => n.id === currentEditingId);
        if (noteIndex !== -1) {
            notes[noteIndex].body = content;
            // Judul diambil dari baris pertama teks
            notes[noteIndex].title = content.split('\n')[0].substring(0, 20) || "New Note";
        }
    }
    localStorage.setItem('aubrey_notes', JSON.stringify(notes));
}

// Fungsi buat hapus catatan yang lagi dibuka
function deleteCurrentNote() {
    if (!currentEditingId) return;

    // Konfirmasi ala iOS (opsional, biar ga sengaja kehapus)
    if (confirm("Delete this note?")) {
        // Filter array: buang yang ID-nya sama ama yang lagi dibuka
        notes = notes.filter(n => n.id !== currentEditingId);
        
        // Simpan perubahan ke localStorage
        localStorage.setItem('aubrey_notes', JSON.stringify(notes));
        
        // Balik ke list utama
        currentEditingId = null;
        listView.classList.remove('hidden');
        editorView.classList.add('hidden');
        renderNotes();
    }
}

// Update fungsi showList biar ga nge-save kalo baru aja dihapus
function showList() {
    if (currentEditingId) {
        saveNote();
    }
    editorView.classList.add('hidden');
    listView.classList.remove('hidden');
    renderNotes();
}

// Jalankan render pertama kali
renderNotes();