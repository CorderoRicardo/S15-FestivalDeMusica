document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    fixNav();
    crearGaleria();
    scrollNav();
}

function fixNav() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().top < 0) {
            barra.classList.add('fijo');
        } else {
            barra.classList.remove('fijo');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach((enlace) => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                    <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                    <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galería"/>
                `;
        imagen.onclick = function () {
            mostrarImagen(i);
        };
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
                    <source srcset="build/img/grande/${id}.avif" type="image/avif">
                    <source srcset="build/img/grande/${id}.webp" type="image/webp">
                    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería"/>
                `;

    // Create the overlay with the image
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };

    //Close the modal
    const closeModal = document.createElement('P');
    closeModal.textContent = 'X';
    closeModal.classList.add('btn-cerrar');
    closeModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    overlay.appendChild(closeModal);

    // Add the overlay in the HTML document
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
