const Product =require('../models/Product')
//Creamos las funciones axuliares que nos ayudaran a mintar el html
// Función auxiliar para generar la base del HTML

const baseHtml = () => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xarvan</title>
        <link rel="stylesheet" href="/styles.css">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <!-- Popper JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      </head>
      <body>
    `;
  };

//Fucnión auxiliar para generar la barra de navegación
 const getNavBar = (req)=> {
    let navBarHtml = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Xarvan</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/products">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Camisetas">Camisetas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Pantalones">Pantalones</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Zapatos">Zapatos</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" href="/Accesorios">Accesorios</a>
        </li>
        <li class="nav-item">
         <a class="nav-link" href="/dashboard">Login</a>
        </li>`;
    // Si estamos en la ruta del dashboard, agregamos un enlace para subir un nuevo producto
    if (req.path === '/dashboard') {
      navBarHtml += `
    
        <li class="nav-item">
         <a class="nav-link" href="/dashboard/new">Subir Nuevo Producto</a>
          `;
    }
    navBarHtml += `</ul>
    </div>
  </div>
</nav>`
    return navBarHtml;
  }

// Funcion auxilar que nos ayuda a pintar las cartas de los distintos productos
  const getProductCards=(products)=> {
    let  productsCard = '';
    let html = '';
    for (let product of products) {
      html += `
        <div class="col">
           <div class="row row-cols-1 row-cols-md-3 g-4" style="width:18rem";>
          <img src="${product.imagen}" class="card-img-top" alt="${product.imagen}" style="width:18rem"; >
          <div class="card-body">
          <h5 class="card-title">${product.nombre}</h5>
          <p>${product.precio}€</p>
          <a href="${product._id}" class="btn btn-primary">Ver detalle</a>
        </div>
        </div>
        </div>`;
    }
    productsCard = `<div class="row row-cols-1 row-cols-md-3 g-4">${html}</div>`;
    return productsCard;
  }
  
function getCategoryCard(categories){
  let  categoryCard = '';
  let html = '';
  for (let category of categories) {
    html += `
      <div class="col">
         <div class="row row-cols-1 row-cols-md-3 g-4" style="width:18rem";>
        <div class="card-body">
        <h5 class="card-title">${category}</h5>
        <a href="/${category}" class="btn btn-primary">Ver detalle</a>
      </div>
      </div>
      </div>`;
  }
  categoryCard = `<div class="row row-cols-1 row-cols-md-3 g-4">${html}</div>`;
  return categoryCard;
}
const getProductCard = (product) => {
  const html = `
      <div class="col">
          <div class="card" style="width: 18rem;">
              <img src="/images/${product.imagen}" class="card-img-top" alt="${product.nombre}">
              <div class="card-body">
                  <h5 class="card-title">${product.nombre}</h5>
                  <p class="card-text">${product.descripcion}</p>
                  <p class="card-text">${product.precio}€</p>
                  <p class="card-text">Talla: ${product.talla}</p>
                  <a href="/products/${product._id}" class="btn btn-primary">Ver detalle</a>
              </div>
          </div>
      </div>
  `;
  return html;
};

module.exports={
    baseHtml,
    getNavBar,
    getProductCards,
    getCategoryCard,
    getProductCard
}
