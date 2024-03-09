  # Tienda de ropa con Mongo y Node

  Montarmos una tienda de ropa con un catálogo de productos y un dashboard para el administrador,
   en el que pude editar o eliminar los productos. Los productos se guardan en una base de 
   datos de mongo en Atlas. 

  ## Índice

    - [Modelo de producto](#creación-de-modelos)
    - [Rutas y sus controladores](#rutas-y-controladores)
    - [Despliegue](#despliegue)
    - [Bonus 1 - Tests](#bonus-1---tests)
    - [Bonus 2 - Autenticación con Firebase](#bonus-2---autenticación-con-firebase)
    - [Bonus 3 - API y documentación con Swagger](#bonus-3---api-y-documentación-con-swagger)

  ## Creación de modelo

  El modelo de los distintos productos es el siguiente:

  ```
  productSchema = new mongoose.Schema({
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
      categoria: {
          type: String,
          enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
          required: true
      },
      talla: {
          type: String,
          enum: ['XS', 'S', 'M', 'L', 'XL'],
          required: true
      },
      precio: {
          type: Number,
          required: true
      }
  });
  ```
- *Nombre*: sera de tipo  string y obligatorio. 
- *Descripción*: sera de tipo string y obligatorio. 
- *Imagen*: sera de tipo string y obligario.
- *categoria*: sera de tipo string(solo se podra escojer entre 'Camisetas', 'Pantalones',
       'Zapatos' o 'Accesorios') y obligario.
- *Talla*:sera de tipo string(solo se podra escojer entre 'SL','S', 'M', 'L' o 'XL') y obligario.


  ## rutas y controladores

  Las rutas **/products** y **/dashboard**  con el metodo:
  - **GET** : tiene el controlador *showProducts* que nos devolvera  todos los productos.

  ```
  -async showProducts(req, res){
        try {
          const products = await Product.find();
          if(req.path ==='/dashboard'){
            let DashboardCard = getDashboard(products)
            let htmlDashboard = baseHtml()+ getNavBar(req) +  DashboardCard + footer();
            res.send(htmlDashboard)
          }else{
            let productsCard = getProductCards(products)
            let htmlproducts = baseHtml()+ getNavBar(req) +  productsCard + footer();
            res.send(htmlproducts)
          }
        } catch (error) {
  #Lanzamos un error en caso de que no se puedan obtener los productos#
          console.error(error);
          res.status(500).json({ error: 'Error al obtener los productos' });
        }
      },
  ```
  Primero haremos una busqueda a la base de datos y nos traemos todos los 
  productos.Si estamos en la ruta **/dashboard**  llamaremos a la funcion 
  *getDashboard()* para generar las cartas de esos productos con enlaces para editarlos o eliminarlos y con *htmlproducts* añadimos la cabecera del HTML, la barra de navegacion, las cartas y el footer y respondemos con eso a la peticion.
  En otro caso la respuesta seria la misma pero sin los enlaces para editar o eliminar los productos.

- Las rutas **/products/:productId** y **/dashboard/:productId**  con el metodo:
  - **GET** : tiene el controlador  *showProductByIdl*  que nos devuelve el detalle de un solo producto buscado por su id.

  ```
  async showProductByIdl(req, res){
      const productId = req.params.productId;
      try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        if(req.originalUrl.includes('dashboard')){
          const productCard= getProductCardDashboard(product)
          let htmlproduct = baseHtml()+ getNavBar(req) +  productCard + footer();
          res.send(htmlproduct);
        }else {
          const productCard= getProductCard (product)
          let htmlproduct = baseHtml()+ getNavBar(req) +  productCard + footer();
          res.send(htmlproduct);
        } 
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle del producto' });
      }
    },
  ```
Obtenemos el id producto y hacemos un busqueda a la base de datos con ese id. Si no existe 
el producto lanzamos un error.De lo contrario mostramos su información completa y si es una petición desde dashboard añadimos los enlaces de editar y eliminar el producto. Añadimos la carta del productos a los elementos del HTML y 
respondemos a la peticion. En caso de estar en esa ruta nos devuelve la información completa del producto sin los enlaces.

-La ruta **/dashboard/new**  con el metodo:
 - **GET**: Devuelve el formulario para subir un artículo nuevo.

-La ruta **/dashboard** con el metodo:
  - **POST**: Crea un nuevo producto.

  ```
  async createProduct(req, res){
    const { nombre, descripcion, categoria,imagen, talla, precio } = req.body
    const newProdu = {
      nombre:nombre,
      descripcion:descripcion,
      imagen:imagen,
      categoria:categoria,
      talla:talla,
      precio:precio
    }
    try {
      const newProduct = await Product.create(newProdu)
      const newId = newProduct._id
      return res.redirect(`/dashboard/${newId}`)
    }
  catch(error) {
      res.status(500).send({message: 'Something went wrong!', error})
    }
  },
```
Creamos las variables nombre, descripcion, categoria,imagen, talla y precio obteniendo la informacion del body.
Creamos un nuevo producto con esas variables y lo subimos a nuestra base de datos. Nos traemos el id y nos diriguiremos a */dashboard/${newId}* para que nos muestre la información completa del producto creado.
Lanzaremos un error en caso de que algo falle a la hora de crear el producto.

-La ruta **/dashboard/:productId/edit** con el metodo:
  - **GET**: Devuelve el formulario para editar un producto.

Recibirá un formulario completado por defecto con los valores actuales del producto.

- La ruta **/dashboard/:productId** con el metodo:
  - **POST **: Actualiza un producto.

  ´´´´
    async updateProduct(req, res){
    try {
      const productId = req.params.productId;
      const { nombre, descripcion, imagen, categoria, talla, precio } = req.body
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        nombre,
        descripcion,
        imagen,
        categoria,
        talla,
        precio
      }, { new: true });
      res.redirect(`/dashboard/${productId}`);
    } catch (error) {
      res.status(500).send("Error al actualizar el producto");
    }
  },
  ´´´´
Buscamos el producto en nuestra base de datos por su ID y cambiamos los parametros por los del formulario anterior.
Nos diriguimos a */dashboard/${productId}* para ver la información completa del producto con los datos cambiados.

-La ruta **/dashboard/:productId/delete** con el metodo:
  -**GET**:Elimina un producto

 ```
 async deleteProduct(req, res){
    try {
      const productId = req.params.productId;    
      await Product.findByIdAndDelete(productId);
      res.redirect('/dashboard');
    } catch (error) {
      res.status(500).send("Error al eliminar el producto");
    }
  },
 ```
 Obtenemos el ID del productos, los buscamos en la base de datos y lo eliminamos.Nos redireccionamos a /dashboard para ver como el producto esta eliminado.


## Despliegue
El proyecto esta desplejado en fl0, con tu propia base de datos puedes experimentar a crear, editar y eliminar productos.
https://backend-project-break-dev-thap.3.us-1.fl0.io/




## Recursos

  - [Express](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [Atlas](https://www.mongodb.com/cloud/atlas)
  - [Fl0](https://fl0.io/)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express-session](https://www.npmjs.com/package/express-session)
  - [express.urlencoded](https://expressjs.com/en/api.html#express.urlencoded)
  - [express.static](https://expressjs.com/en/api.html#express.static)
  
