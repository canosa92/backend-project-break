//importamos las distintas funciones auxiliares que hemos creado y el modelo
const Product=require('../models/Product')
const { baseHtml,getNavBar,footer,createHomeBody,getProductCards,getDashboard,getProductCard,formNew,EditProductForm} =require('./auxilarControllers')

//Funcion para mostrar la la home de la tienda 
const showHome = async (req, res) => {
      // Añadimos la base del HTLM, el navBar, la presentación de la marca y el footer
      let card = baseHtml()+ getNavBar(req) + createHomeBody() + footer();
      //Respondemos a la peticion con el html 
      res.send(card);
};

/*Los controladores van a ser muy similares, por norma general seguiran los soguientes pasos:
1. Buscamos el/los productos o las categorias que querramos mostrar
2. LLamamos a la funcion auxiliar para que nos pinte ese/s productos o categorias
3. Añadimos la base del html, la barra de navegacion, el resultado de la funcion anterior y el footer
4. Lanzamos un error en caso de que algo no funciones
*/
  
//Funcion que nos devuelve pintados todos los productos
const showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
        return res.status(404).send('Productos no encontrados');
    }
    const productCards = getProductCards(products);
    const html = baseHtml() + getNavBar(req) + productCards + footer();
    return res.send(html);
  
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener los productos');
  }
};


//Funcion para obtener todos los productos filtrados por categorias   
const showProductsByCategory = async (req, res) => {
  //En este caso primero obtenemos el la categoria del producto 
  const category = req.params.categoria;
  try {
  // Buscar todos los productos que esten dentro de esa categoria y pintamos el HTML
    const products = await Product.find({ categoria: category });
    const productCards = getProductCards(products);
    const html = baseHtml() + getNavBar(req) + productCards + footer();
    res.send(html);
  } catch (error) {
    console.log(error)
          res.status(500).json({ message: error.message });
      }
};
//Funcion que nos devuelve pintados todos los productos en el dahsboard
const showDashboard= async (req, res) => {
  try {
    //Buscamos en la base de datos todos los productos
      const productos = await Product.find();
      const dashboardCards = getDashboard(productos);
      console.log(dashboardCards);
      const html = baseHtml() + getNavBar(req) + dashboardCards + footer();
      console.log(html)
      res.json(productos);
      res
    } catch (error) {
      res.status(500).send('Error al obtener los productos');
    }
  };
   
//Creamos la funcion para que nos devuelve pintado un producto buscado por su Id
const showProductById = async (req, res) => {
//En este caso primero obtenemos el Id del producto
  const productId = req.params.productId;
  try {
    //buscamos el producto en la base de datos
    const product = await Product.findById(productId);
    //Lanzamos un error en caso de no encontrar el producto
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    //Obtenemos los datos de ese producto y lo pintamos en el HTML, como en las anteriores funciones
    const productCard = getProductCard(product);
    const html = baseHtml() + getNavBar(req) +productCard + footer();
    res.send(html);
  }catch (error) {
    //lanzamos un error si hay algun problema al obtener el producto
    res.status(500).send('Error al obtener el producto');
  }
};
/*Creamos la funcion para crear nuevos productos
en este caso no vamos a requerir ninguna caracteristica de los productos que tenemos
ya que servira para crear nuevos, por eso esta funcion solo nos pintara el html con el formulario*/
const showNewProduct = (req, res) => {
    // Añadimos la base del HTLM, el navBar, el formulario para crear nuevos productos y el footer
    const html = baseHtml() + getNavBar(req) + formNew() + footer();
    res.send(html);
};

//Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
  try {
      // Extraemos  los datos del formulario(body)
      const { nombre, descripcion, imagen, categoria, talla, precio} = req.body;
      // Crea un nuevo objeto de Producto con los datos proporcionados
      const newProduct =await Product.create({
          nombre,
          descripcion,
          imagen,
          categoria,
          talla,
          precio
      });
      // Guardamos el producto en nuestra base de datos
      const nuevoID = newProduct._id
        return res.redirect(`/dashboard/${nuevoID}`)
      //NOs rediriguimos a la vista de detalle del producto recién creado
  } catch (error) {
      // Lanzamos un error en caso de que haya algun problema a la hora de crear el producto
      res.status(500).send('Error al crear el producto');
  }
};


/* Controlador para obtener el formulario de edición de un producto
const showEditProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
        //lanzamos un error en caso de no encontrar en el producto
          return res.status(404).send('Producto no encontrado');
        }
        //la funcion auxilar EditPoductForm no crea un formulario con los valores del producto que queremos editar
        const html = baseHtml() + getNavBar(req) + EditProductForm(product)+ footer();
       res.send(html);
    } catch (error) {
        // Manejar cualquier error de la base de datos u otros errores
        res.status(500).send('Error al obtener el formulario de edición del producto');
    }
};


//Controlador para actualizar un producto
const updateProduct = async (req, res) => {
    //Obtenemos tanto el id del proructo como los datos que queremos cambiar
    const productId = req.params.productId;
    const { nombre, descripcion, imagen, categoria, talla, precio } = req.body;
    try {
        //Buscar el producto por su ID y actualizarmos los datos con lso resultado del formulario 
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            nombre,
            descripcion,
            imagen,
            categoria,
            talla,
            precio
        }, { new: true });
        //Lanzamos un error en caso de no encontrar al producto
        if (!updatedProduct) {
            return res.status(404).send('Producto no encontrado');
        }

        // Redirigir a la vista de detalle del producto actualizado
        res.redirect(`/dashboard
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};


*/



const showEditProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        const html = baseHtml() + getNavBar() + '<h2>Formulario para editar un producto</h2>';
        res.send(html);
    } catch (error) {
        res.status(500).send("Error al obtener el producto para editar");
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndUpdate(productId, req.body);
        res.redirect(`/products/${productId}`);
    } catch (error) {
        res.status(500).send("Error al actualizar el producto");
    }
};

//Controlador para eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        await Product.findByIdAndDelete(productId);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send("Error al eliminar el producto");
    }
};



// Exportamos los controladores
module.exports = {
    showHome,
    showProducts,
    showProductById,
    showDashboard,
    showProductsByCategory,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
};
