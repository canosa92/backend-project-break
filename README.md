# Tienda de ropa con Mongo y Node

Montarmos una tienda de ropa con un catálogo de productos y un dashboard para el administrador, en el que pude editar o eliminar los productos. Los productos se guardan en una base de datos de mongo en Atlas. 

## Índice

  - [Modelo de producto](#creación-de-modelos)
  - [Rutas y sus controladores](#rutas-y-controladores)
  - [Despliegue](#despliegue)
  - [Documentación](#documentación)
  - [Bonus 1 - Tests](#bonus-1---tests)
  - [Bonus 2 - Autenticación con Firebase](#bonus-2---autenticación-con-firebase)
  - [Bonus 3 - API y documentación con Swagger](#bonus-3---api-y-documentación-con-swagger)

## Creación de modelo

El modelo de los distintos productos es el siguiente:

```
productSchema = new mongoose.Schema({

  """Tanto el nombre como la descripcion y la imagen de los productos
      son de tipo String y tendran que estar cubierto."""

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },

     """La categoria también sera de tipo string y será requerido, pero en este caso solo podra ser una de estas cuatro opciones: Camisetas, Pantalones, Zapatos o Accesorios """

    categoria: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true
    },

     """ En el caso de la talla las opciones serian 'XS', 'S', 'M', 'L' o 'XL'"""

    talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true
    },
    """El precio en cambio sera un numero"""
    precio: {
        type: Number,
        required: true
    }
});
```

## rutas y controladores

Las rutas **/products** y **/dashboard**  con el metodo:
- **GET** : tiene el controlador *showProducts* que nos devolvera  todos los productos.

```
async showProducts(req, res){
      try {
        >hacemos una busqueda a nuestro base de datos que nos devolvera
        todos los productos  guardados en ella.<git 
        const products = await Product.find();

       
        if(req.path ==='/dashboard'){

# Si estamos en la ruta _ _/dashboard_ _ pasamos por los productos por la funcion auxiliar _ _getDashboard_ _ que no devuelve esos productos pintados en una carta  con las opciones de eliminar y editar#

          let DashboardCard = getDashboard(products)

          let htmlDashboard = baseHtml()+ getNavBar(req) +  DashboardCard + footer();
# Añadimos la cabecera del documento HTML, la barra de navegacion, las cartas de los productos y el footer y con eso revolvemos la peticion"""

          res.send(htmlDashboard)
        }else{
          let productsCard = getProductCards(products)
          """ la función _ _getProductCard_ _n 
          let htmlproducts = baseHtml()+ getNavBar(req) +  productsCard + footer();
          res.send(htmlproducts)
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
    },
```



- GET /products/:productId: Devuelve el detalle de un producto.
- GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
- GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
- POST /dashboard: Crea un nuevo producto.
- GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
- GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
- PUT /dashboard/:productId: Actualiza un producto.
- DELETE /dashboard/:productId/delete: Elimina un producto.

## Creación de controladores

A continuación crearemos el controlador de productos. Este controlador se dedicará a manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.
Para ello, crearemos algunas funciones auxiliares que nos ayudarán a devolver las vistas con SSR.

Las funciones principales del controlador serán:

-- //showProducts: Devuelve la vista con todos los productos.
-- //showProductById: Devuelve la vista con el detalle de un producto.
-- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- showEditProduct: Devuelve la vista con el formulario para editar un producto.
- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

Las funciones showProducts y showProductById pueden devolver respuestas ligeramente distintas si se llega desde el dashboard o desde la vista principal. Por ejemplo, si se llega desde el dashboard, se mostrará un enlace para editar o eliminar el producto. Para ello podemos utilizar la url de la petición o pasar al controlador un parámetro extra que indique si se llega desde el dashboard o no.

Para generar el html de forma más eficiente y sacarlo de la lógica, podemos crear funciones y variables auxiliares que generen el html de los productos y del formulario.
Por ejemplo:
- baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
- getNavBar: Genera la barra de navegación con las categorías. En caso de estar en el dashboard, también generará un enlace para subir un nuevo producto.
- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
- ...

Un ejemplo de una función para generar el html de los productos podría ser:

```javascript
function getProductCards(products) {
  let html = '';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products/${product._id}">Ver detalle</a>
      </div>
    `;
  }
  return html;
}
```

Con estas funciones auxiliares, el controlador será más limpio y fácil de entender.
Ejemplo:

```javascript

const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products);
  const html = baseHtml + getNavBar() + productCards;
  res.send(html);
};
    
```

## Despliegue

Creamos un nuevo proyecto en fl0 y desplegamos el proyecto desde github. Recordad añadir las variables de entorno en fl0. Si no aparece el repositorio en fl0, tendremos que modificar los permisos de fl0 para que pueda acceder al repositorio.

## Documentación

Crearemos un archivo `README.md` que contenga la documentación del proyecto. En este readme explicaremos cómo poner en marcha la aplicación, las tecnologías que hemos usado, endpoints, etc.

## Bonus 1 - Tests

Para poder comprobar que el controlador de productos funciona correctamente, vamos a crear tests para las funciones. Para ello, necesitaremos instalar el paquete `jest` y crear el archivo `productController.test.js` en la carpeta `test`. En este archivo, importaremos el controlador y crearemos los tests. Podemos hacer tests tanto para las funciones que devuelven html como para las funciones que crean, actualizan o eliminan productos.


## Bonus 2 - Autenticación con Firebase

Vamos a crear un login y pass para el administrador con firebase. Para ello, necesitaremos instalar los paquetes `firebase` y `express-session` y configurar el proyecto en firebase. Podemos ver la guía de cómo hacerlo en el pdf [firebase.pdf](firebase.pdf).

Una vez configurado el proyecto en firebase, podremos crear un formulario de login. Este formulario enviará las credenciales a un endpoint que comprobará si son correctas. Si son correctas, redirigirá al dashboard. Si no, mostrará un mensaje de error. También tendremos una página de registro, a la que se podrá acceder desde el formulario de login. Además, tendremos que crear un archivo `firebase.js` que inicialice la conexión con firebase y que contenga las funciones para comprobar si las credenciales son correctas y para cerrar la sesión.

Para comprobar si las credenciales son correctas, necesitaremos el middleware `express-session` para guardar la sesión del usuario. Tendremos que modificar el archivo index.js para que inicialice el middleware y lo use en las rutas del dashboard. También tendremos que añadir una palabra secreta para la sesión en el archivo .env y crear un archivo `middlewares/authMiddleware.js` que contenga el middleware para comprobar si el usuario está autenticado. Este buscará la sesión del usuario y, si no la encuentra, redirigirá al formulario de login.

## Bonus 3 - API y documentación con Swagger

Para poder usar la aplicación con un frontend en React, vamos a crear una API que haga las mismas operaciones que el controlador de productos, pero que devuelva los datos en formato JSON. Documentaremos la API con Swagger, para que sea más fácil de entender y usar.

## Recursos

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Atlas](https://www.mongodb.com/cloud/atlas)
- [Fl0](https://fl0.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-session](https://www.npmjs.com/package/express-session)
- [express.urlencoded](https://expressjs.com/en/api.html#express.urlencoded)
- [express.static](https://expressjs.com/en/api.html#express.static)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Firebase](https://firebase.google.com/)
  - [Firebase Auth](https://firebase.google.com/docs/auth)
  - [Get Started with Firebase Authentication on Websites](https://firebase.google.com/docs/auth/web/start)


