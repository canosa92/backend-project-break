const mongoose = require('mongoose');

// Definimos el modelo de producto
const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true
    },
    talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

/*Cada campo del producto tiene un tipo de dato asociado (String para nombre, descripción, imagen, categoría y talla, y Number para precio). 
También hemos utilizado opciones como required para indicar quecampos son obligatorios(en este caso todos),
y enum para definir una lista de valores válidos para categoria y talla.*/

// Crear el modelo de Producto
const Product = mongoose.model('Product', productSchema);

//exportamos el modelo de Producto
module.exports = Product;
