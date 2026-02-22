    function checkFont(fontName) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const text = "abcdefghijklmnopqrstuvwxyz0123456789";
        
        context.font = "72px monospace";
        const baselineWidth = context.measureText(text).width;
        
        context.font = "72px '" + fontName + "', monospace";
        const newWidth = context.measureText(text).width;
        
        return newWidth !== baselineWidth;
    }

    // If the font ISN'T detected, show the warning
    if (!checkFont("OMORI_GAME")) {
        document.getElementById("font-warning").style.display = "block";
    }

    // Switcher
    function showPage(pageId) {
    // Hide all sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the requested section
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

document.addEventListener('A', function(event) {
    // Your code to handle the key press goes here
    alert('Key pressed:');
});
