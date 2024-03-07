// controllers/productController.js
const {baseHtml,getNavBar,footer,createHomeBody} =require ('./auxiliarControler/baisc')
const {getProductCards,getDashboard,getProductCard,getProductCardDashboard}=require ('./auxiliarControler/createCards')
const {NewForm,formEdit}=require('./auxiliarControler/forms')
const Product = require('../models/Product');


const ProductController = {
    
    async homeController(req, res) {
      let card = baseHtml()+ getNavBar(req) + createHomeBody()+footer();
      //Respondemos a la peticion con el html 
      res.send(card);
    },

    // Controlador para obtener todos los productos
    async showProducts(req, res){
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
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
    },

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
  
  async showProductsByCategory (req, res){
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
    },
    
    showNewProduct(req, res){
      // Añadimos la base del HTLM, el navBar, el formulario para crear nuevos productos y el footer
      const html = baseHtml() + getNavBar(req) + NewForm() + footer();
      res.send(html);
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
        const newId = newProduct._id
        return res.redirect(`/dashboard/${newId}`)
    
  }
  catch(error) {
      res.status(500).send({message: 'Something went wrong!', error})
  }
},

async showEditProduct(req, res){
  try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      console.log(product)
    
      let htmlform = baseHtml() + getNavBar(req) + formEdit(product) + footer();
      res.send(htmlform);    
      
  } catch (error) {
      res.status(500).send("Error al obtener el producto para editar");
  }
},

async updateProduct(req, res){
  try {
      const productId = req.params.productId;
      const { nombre, descripcion, imagen, categoria, talla, precio } = req.body
      console.log(productId)
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        nombre,
        descripcion,
        imagen,
        categoria,
        talla,
        precio
    }, { new: true });
      console.log(updatedProduct)
      res.redirect(`/dashboard/${productId}`);
  } catch (error) {
      res.status(500).send("Error al actualizar el producto");
  }
},
async deleteProduct(req, res){
  try {
      const productId = req.params.productId;
      
      await Product.findByIdAndDelete(productId);
      console.log(productId);
      res.redirect('/dashboard');
  } catch (error) {
      res.status(500).send("Error al eliminar el producto");
  }
},


}

module.exports =ProductController