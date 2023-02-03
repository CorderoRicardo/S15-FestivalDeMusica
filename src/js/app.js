document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    fixNav();
    crearGaleria();
    scrollNav();
    topNav();
}

function fixNav() {
    const barra = document.querySelector('.header');
    const video = document.querySelector('.video');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function () {
        if (video.getBoundingClientRect().top < 10) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
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

function topNav() {
    const enlace = document.querySelector('.contenido-header h1 a');
    enlace.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(e.target.attributes.href.value);
        section.scrollIntoView({ behavior: 'smooth' });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.classList.add('small-img');
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
    let imagen = document.createElement('picture');
    imagen.innerHTML = `
                    <source srcset="build/img/grande/${id}.avif" type="image/avif">
                    <source srcset="build/img/grande/${id}.webp" type="image/webp">
                    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería"/>
                `;

    // Create the overlay with the image
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay-modal');
    // overlay.onclick = function () {
    //     const body = document.querySelector('body');
    //     body.classList.remove('fijar-body');
    //     overlay.remove();
    // };

    //Close the modal
    const closeModal = document.createElement('BUTTON');
    closeModal.textContent = 'X';
    closeModal.classList.add('btn-cerrar');
    closeModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    overlay.appendChild(closeModal);

    const invisibleDiv = document.createElement('DIV');
    invisibleDiv.classList.add('close-modal');
    invisibleDiv.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    overlay.appendChild(invisibleDiv);

    //Next image
    const nextImage = document.createElement('BUTTON');
    nextImage.textContent = '>';
    nextImage.classList.add('btn-siguiente');
    nextImage.onclick = function () {
        if (id < 12) {
            imagen.remove();
            id = id + 1;
            imagen = setupImage(id);
            overlay.appendChild(imagen);
        } else {
            imagen.remove();
            id = 1;
            imagen = setupImage(id);
            overlay.appendChild(imagen);
        }
    };

    overlay.appendChild(nextImage);

    //Previous image
    const previousImage = document.createElement('BUTTON');
    previousImage.textContent = '<';
    previousImage.classList.add('btn-anterior');
    previousImage.onclick = function () {
        if (id > 1) {
            imagen.remove();
            id = id - 1;
            imagen = setupImage(id);
            overlay.appendChild(imagen);
        } else {
            imagen.remove();
            id = 12;
            imagen = setupImage(id);
            overlay.appendChild(imagen);
        }
    };

    overlay.appendChild(previousImage);

    // Add the overlay in the HTML document
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}

function setupImage(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería"/>
            `;
    return imagen;
}
