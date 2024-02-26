const Product =require('../models/Product')
const { baseHtml,getNavBar,getProductCards,getCategoryCard,getProductCard} =require('./auxilarControllers')

const showCategory = async (req, res) => {
  try {
      // Buscar productos por categoría en la base de datos
      const categories = await Product.distinct('categoria')
      const categoriesCards = getCategoryCard(categories);
      // Construir el HTML con las categorías
      let card = baseHtml()+getNavBar(req) +categoriesCards ;
    
      res.send(card);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener productos por categoría');
  }
};
  
//Funcion que nos devuelve todos los productos
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

      
const showProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send('Producto no encontrado');
    }
    const productCard = getProductCard(product);
      const html = baseHtml() + getNavBar(req) +productCard;
        res.send(html);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el producto');
      }
    };

const showProductsByCategory = async (req, res) => {
  const category = req.params.categoria;
  console.log(category)
  try {
          // Buscar productos por categoría en la base de datos
          const products = await Product.find({ categoria: category });
          const productCards = getProductCards(products);
          const html = baseHtml() + getNavBar(req) +productCards;
            res.send(html);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  module.exports={
    showCategory,
    showProducts,
    showProductById,
    showProductsByCategory 
  }