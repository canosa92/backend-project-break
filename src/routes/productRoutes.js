const express= require('express')
const routes = express.Router()
const ProductController = require ('../controllers/productController')
const ApiController = require ('../api/api')

routes.get('/',ProductController.homeController)
routes.get('/products',ProductController.showProducts);
routes.get('/dashboard',ProductController.showProducts);

routes.get('/products/:productId',ProductController.showProductByIdl);
routes.get('/:categoria',ProductController.showProductsByCategory);

routes.get('/dashboard/new',ProductController.showNewProduct);
routes.post('/dashboard',ProductController.createProduct);

routes.get('/dashboard/:productId',ProductController.showProductByIdl);
routes.get('/dashboard/:productId/edit',ProductController.showEditProduct);
routes.post('/dashboard/:productId',ProductController.updateProduct);
routes.get('/dashboard/:productId/delete',ProductController.deleteProduct);

routes.get('/api',ApiController)

module.exports = routes;
