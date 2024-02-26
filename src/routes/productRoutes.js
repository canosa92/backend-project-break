const express=require('express')
const routes =express.Router()
const productControllers =require('../controllers/productController')

//se le añade la ruta / para
routes.get('/', productControllers.showProducts)  
routes.get('/products',productControllers.showProducts);
routes.get('/products/:productId',);
routes.get('/dashboard',);
routes.get('/dashboard/new',);
routes.post('/dashboard',);
routes.get('/dashboard/:productId:',);
routes.get('/dashboard/:productId/edit',);
routes.put('/dashboard/:productId',);
routes.delete('/dashboard/:productId/delete',);


module.exports= routes