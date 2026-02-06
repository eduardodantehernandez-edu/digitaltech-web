// --- CARGA INICIAL ---
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    setInterval(nextSlide, 5000);
});

// --- SLIDER ---
function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length < 2) return;
    let current = document.querySelector('.slide.active');
    current.classList.remove('active');
    let next = current.nextElementSibling || slides[0];
    next.classList.add('active');
}

// --- ADMIN PANEL ---
function toggleAdmin() {
    document.getElementById('adminPanel').classList.toggle('open');
    document.body.classList.toggle('admin-mode');
}

// --- SUBIDA DE IMAGENES ---
function handleUpload(target) {
    const input = target === 'slider' ? document.getElementById('inputSlider') : document.getElementById('inputGallery');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target.result;
            if (target === 'slider') {
                addSlide(imgData);
            } else {
                addGalleryItem(imgData);
            }
            saveToLocal(); // Guardar en memoria del navegador
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addSlide(src) {
    const wrapper = document.getElementById('mainSlider');
    const div = document.createElement('div');
    div.className = 'slide';
    div.innerHTML = `
        <img src="${src}">
        <div class="hero-content"><h1>NUEVO EQUIPO</h1><p>Cargado recientemente.</p></div>
        <button class="btn-del" onclick="this.parentElement.remove(); saveToLocal();"><i class="fas fa-trash"></i></button>
    `;
    wrapper.appendChild(div);
}

function addGalleryItem(src) {
    const grid = document.getElementById('galleryGrid');
    const div = document.createElement('div');
    div.className = 'gal-item';
    div.innerHTML = `
        <img src="${src}">
        <button class="btn-del" onclick="this.parentElement.remove(); saveToLocal();"><i class="fas fa-trash"></i></button>
    `;
    grid.prepend(div);
}

// --- GUARDAR Y CARGAR DE LOCALSTORAGE ---
function saveToLocal() {
    const galleryImages = Array.from(document.querySelectorAll('.gal-item img')).map(img => img.src);
    localStorage.setItem('techSecure_gallery', JSON.stringify(galleryImages));
}

function loadSavedData() {
    const savedGal = JSON.parse(localStorage.getItem('techSecure_gallery') || "[]");
    savedGal.forEach(src => addGalleryItem(src));
}