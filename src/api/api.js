const Product = require('../models/Product');

const ApiController = {
    
    async homeController(req, res) {
      try {
        // Implementa la lógica necesaria para obtener los datos necesarios para la página de inicio
        res.json({ message: 'Bienvenido a la página de inicio' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cargar la página de inicio' });
      }
    },

    async showProducts(req, res){
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
    },

    async showProductById(req, res){
      const productId = req.params.productId;
      try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el detalle del producto' });
      }
    },
  
    async showProductsByCategory(req, res){
      const category = req.params.categoria;
      try {
        const products = await Product.find({ categoria: category });
        res.json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos de la categoría' });
      }
    },
    
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
        res.status(201).json(newProduct);
      } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear un nuevo producto', error });
      }
    },

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
        res.json(updatedProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
      }
    },

    async deleteProduct(req, res){
      try {
        const productId = req.params.productId;    
        await Product.findByIdAndDelete(productId);
        res.json({ message: 'Producto eliminado correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
      }
    }
}

module.exports = ApiController;
