//importamos las distintas funciones auxiliares que hemos creado y el modelo
const Product=require('../models/Product')
const { baseHtml,getNavBar,getProductCards,getCategoryCard,getProductCard,formNew} =require('./auxilarControllers')

/*Los controladores van a ser muy similares, por norma general seguiran los soguientes pasos:
1. Buscamos el/los productos o las categorias que querramos mostrar
2. LLamamos a la funcion auxiliar para que nos pinte ese/s productos o categorias
3. Añadimos la base del html, la barra de navegacion, el resultado de la funcion anterior y el footer
4. Lanzamos un error en caso de que algo no funcione
*/

//Funcion para mostrar todas las categorias de los productos
const showCategory = async (req, res) => {
  try {
      //Buscamos las distintas categorias en la base de datos
      const categories = await Product.distinct('categoria')
      //Llamamos a la funcion para que nos pinte el html con esas categorias 
      const categoriesCards = getCategoryCard(categories);
      // Añadimos la base del HTLM, el navBar, el resultado de la función anterior y el footer
      let card = baseHtml()+ getNavBar(req) + categoriesCards ;
      //Respondemos a esta peticion con el html entero
      res.send(card);
  } catch (error) {
    //Nos devuelve un error en caso de no obtener las categorias
      console.error(error);
      res.status(500).send('Error al obtener las categorías de los productos');
  }
};
  
//Funcion que nos devuelve pintados todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        const html = baseHtml() + getNavBar(req) + productCards;
        res.send(html);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
    };

//Creamos la funcion para que nos devuelve pintado un producto por su Id    
const showProductById = async (req, res) => {
//En este caso primero obtenemos el Id del producto
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
// Lanzamos un error en caso de no encontrar el producto
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
//Obtenemos los datos de ese producto y lo pintamos en el HTML, como en las anteriores funciones
    const productCard = getProductCard(product);
    const html = baseHtml() + getNavBar(req) +productCard;
    res.send(html);
  }catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener el producto');
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
    const html = baseHtml() + getNavBar(req) + productCards;
    res.send(html);
  } catch (error) {
          res.status(500).json({ message: error.message });
      }
};

/*Creamos la funcion para crear nuevos productos
en este caso no vamos a requerir ninguna caracteristica de los productos que tenemos
ya que servira para crear nuevos, por eso esta funcion solo nos pintara el html con el formulario*/
const showNewProduct = (req, res) => {
  try {
    const html = baseHtml() + getNavBar(req) + formNew();
    res.send(html);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//Exportamos los distintos controladores
module.exports={
  showCategory,
  showProducts,
  showProductById,
  showProductsByCategory,
  showNewProduct
}