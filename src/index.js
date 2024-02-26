/*importamos los modulos de express para crear un servidor
tambien importamos todos los modulos  y las rutas que hemos estado creado en las distintas rutas*/
const express =require('express');
const app =express();
require('dotenv').config();
const PORT = process.env.PORT ;
const dbConnection=require('./config/db')
const routes= require('./routes/productRoutes')

//conectamos la base de datos
dbConnection();

//indicamos que middleware de Express necesitamos que se apliquen en todas las rutas 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.use(express.json());

//Indicamos que la ruta / sera la primera ruta que nos llevara y a partir de ahi todas las demas
app.use('/', routes);

app.listen(PORT,()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`)
})


