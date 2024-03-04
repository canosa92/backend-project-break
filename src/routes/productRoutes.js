const express = require ('express');
const routes = express.Router();
const productControllers = require('../controllers/productController');

routes.get('/', productControllers.showHome);  
routes.get('/products', productControllers.showProducts);
routes.get('/products/:productId', productControllers.showProductById);
routes.get('/:categoria', productControllers.showProductsByCategory);
routes.get('/dashboard',productControllers.showDashboard);
routes.get('/dashboard/new',productControllers.showNewProduct);
routes.post('/dashboard',productControllers.createProduct);
routes.get('/products/:productId/edit',productControllers.showEditProduct);
routes.put('/dashboard/:productId', productControllers.updateProduct);
routes.get('/dashboard/:productId/delete',productControllers.deleteProduct);

module.exports = routes;
