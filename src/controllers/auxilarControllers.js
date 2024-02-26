//Creamos las funciones axuliares que nos ayudaran a mintar el html

/* Función auxiliar para generar la base del HTML
el nombre del archivo, los enlaces a los ditintos estilos
en este caso vamos a utilizar la libreria Bootrastp*/
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
      <body>`;
  };

//Fucnión auxiliar para generar la barra de navegación
 const getNavBar = (req)=> {
    let navBarHtml = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Xarvan</a>
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
    //cerramos la lista y el div que contiene la barra de navegacion
    navBarHtml += `</ul>
    </div>
  </div>
</nav>`
    return navBarHtml;
  }


// Funcion auxilar que nos ayuda a pintar las cartas de todos los productos
  const getProductCards=(products)=> {
    let  productsCard = '';
    let html = '';
    for (let product of products) {
      html += `
        <div class="col">
           <div class="row row-cols-1 row-cols-md-3 g-4" style="width:18rem";>
          <img src="/${product.imagen}" class="card-img-top" alt="${product.imagen}" style="width:18rem"; >
          <div class="card-body">
          <h5 class="card-title">${product.nombre}</h5>
          <p>${product.precio}€</p>
          <a href="/products/${product._id}" class="btn btn-primary">Ver Detalle</a>
        </div>
        </div>
        </div>`;
    }
    productsCard = `<div class="row row-cols-1 row-cols-md-3 g-4">${html}</div>`;
    return productsCard;
  }
  
//creamos una funcion auxiliar para pintar las distintas categorias
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

//Funcion auxilar para pintar la card de una sola card, para cuando llamemos por el id
const getProductCard = (product) => {
  const html = `
      <div class="col">
          <div class="card" style="width: 18rem;">
              <img src="/${product.imagen}" class="card-img-top" alt="${product.nombre}">
              <div class="card-body">
                  <h5 class="card-title">${product.nombre}</h5>
                  <p class="card-text">${product.descripcion}</p>
                  <p class="card-text">${product.precio}€</p>
                  <p class="card-text">Talla: ${product.talla}</p>
                  <a href="/products/${product._id}" class="btn btn-primary">Comprar</a>
              </div>
          </div>
      </div>
  `;
  return html;
};

const formNew =()=>{
 let form =`
            <div class="container">
                <h2>Subir Nuevo Producto</h2>
                <form action="/dashboard" method="POST">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcion" name="descripcion" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="imagen" class="form-label">URL de la Imagen</label>
                        <input type="url" class="form-control" id="imagen" name="imagen" required>
                    </div>
                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoría</label>
                        <select class="form-select" id="categoria" name="categoria" required>
                            <option value="Camisetas">Camisetas</option>
                            <option value="Pantalones">Pantalones</option>
                            <option value="Zapatos">Zapatos</option>
                            <option value="Accesorios">Accesorios</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="talla" class="form-label">Talla</label>
                        <select class="form-select" id="talla" name="talla" required>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="precio" name="precio" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Subir Producto</button>
                </form>
            </div>
        `;
   return form
};

//exportamos todos los modulos
module.exports={
    baseHtml,
    getNavBar,
    getProductCards,
    getCategoryCard,
    getProductCard,
    formNew
}
