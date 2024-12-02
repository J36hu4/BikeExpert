// Obtener el filtro de la URL y cargar los productos
const filtro = getParameterByName('filter') || 'todo';
filtro === 'todo' ? LoadProducts(): LoadProductsFilter(filtro);

function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function LoadProducts() {
    let rows = document.getElementById("pro");
    rows.innerHTML = '';
    document.querySelectorAll('.Filtros a').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById("todo").className = "active"

    fetch('../data/productos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(bici => {
                let listaFotos = '';
                let isActive = 'active';
                let count = 0;
                bici.Fotos.forEach(foto => {
                    listaFotos += `<div class="carousel-item ${isActive}">
                            <img src="${foto}" class="d-block w-100" alt="...">
                        </div>`;
                    isActive = '';
                    count += 1;
                })
                rows.innerHTML +=
                    `<div class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 Bici-carousel">
                <div id="carouselExampleFade${bici.id}" class="carousel slide carousel-fade" data-bs-ride="carousel"
                    data-bs-interval="3000">
                    <div class="carousel-inner">
                        ${listaFotos}
                    </div>
                    ${count > 1 ?
                        `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade${bici.id}"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon carousel-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade${bici.id}"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon carousel-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>` : ``}
                </div>
            </div>`
            });
        })
}

function LoadProductsFilter(tipo) {
    let rows = document.getElementById("pro");
    rows.innerHTML = "";
    document.querySelectorAll('.Filtros a').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(tipo).className = "active"

    let filtro = '';

    switch (tipo) {
        case 'bicicleta': filtro = 'Bici'; break;
        case 'ropa': filtro = 'Ropa'; break;
        case 'cascos': filtro = 'Casco'; break;
        case 'respuestos': filtro = 'Respuestos'; break;
        case 'gadllets': filtro = 'Gadllets'; break
    }

    fetch('../data/productos.json')
        .then(res => res.json())
        .then(data => {
            data.filter(item => item.tipo === filtro).forEach(bici => {
                let listaFotos = '';
                let isActive = 'active';
                let count = 0;
                bici.Fotos.forEach(foto => {
                    listaFotos += `<div class="carousel-item ${isActive}">
                            <img src="${foto}" class="d-block w-100" alt="...">
                        </div>`;
                    isActive = '';
                    count += 1;
                })
                rows.innerHTML +=
                    `<div class="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 Bici-carousel">
                <div id="carouselExampleFade${bici.id}" class="carousel slide carousel-fade" data-bs-ride="carousel"
                    data-bs-interval="3000">
                    <div class="carousel-inner">
                        ${listaFotos}
                    </div>
                    ${count > 1 ?
                        `<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade${bici.id}"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon carousel-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade${bici.id}"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon carousel-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>` : ``}
                </div>
            </div>`
            });
        })
}