const express = require('express');
const routes = express.Router();
const productControllers = require('../controllers/productController');

routes.get('/', productControllers.showCategory);  
routes.get('/products', productControllers.showProducts);
routes.get('/products/:productId', productControllers.showProductById);
routes.get('/:categoria', productControllers.showProductsByCategory);
routes.get('/dashboard',);
routes.get('/dashboard/new',productControllers.showNewProduct );
routes.post('/dashboard/new',);
routes.get('/dashboard/edit/:productId', );
routes.put('/dashboard/edit/:productId', );
routes.delete('/dashboard/delete/:productId',);

module.exports = routes;
