// Importar el modelo de Producto
const Product = require('../models/Product');

// Crear algunos productos de ejemplo
const createExampleProducts = async () => {
  try {
    // Crear productos
    await Product.create([
      {
        nombre: 'Bolsa algodón',
        descripcion: 'No hay nada más a la última que ser respetuoso con el medio ambiente.Además, esta bolsa tiene el tamaño ideal para ayudarte a hacer la compra, llevar tus libros ¡y todo lo que necesites!',
        imagen: 'images/bolsa_negra.webp',
        categoria: 'Accesorios',
        talla: 'M',
        precio: 17.99
      },
      {
        nombre: 'Bolsa algodón orgánico',
        descripcion: `100% sarga de algodón orgánico certificado
        Peso del tejido: 272 g/m² (8 oz/yd²)
        Dimensiones: 40,6 cm × 35,6 cm × 12,7 cm (16” x 14 ½” x 5”)
        Peso límite: 13,6 kg (30lbs)
        Tiras de 2,5 cm (1”) de ancho, 62,2 cm (24,5") de largo
        Compartimento principal ampliop`,
        imagen: 'images/bolsa_arbol.webp',
        categoria: 'Accesorios',
        talla: 'M',
        precio: 17.99
      },
      {
        nombre: 'Camiseta basica blanca',
        descripcion: `Los colores sólidos son 100% de algodón Airlume peinado e hilado en anillos 
        El tono Ash es en un 99% de algodón peinado e hilado en anillos y contiene un 1% de poliéster
        Los tonos Heather se componen de un 52% de algodón peinado e hilado en anillos y un 48% de poliéster
        Los tonos Athletic y Black Heather se componen de un 90% de algodón peinado e hilado en anillos y un 10% de poliéster`,
        imagen: 'images/camisa_blanca.webp',
        categoria: 'Camisetas',
        talla: 'S',
        precio: 15.99
      },
      {
        nombre: 'Camiseta esencial unisex',
        descripcion: `Los colores sólidos son 100% de algodón Airlume peinado e hilado en anillos
        El tono Ash es en un 99% de algodón peinado e hilado en anillos y contiene un 1% de poliéster
        Los tonos Heather se componen de un 52% de algodón peinado e hilado en anillos y un 48% de poliéster
        Los tonos Athletic y Black Heather se componen de un 90% de algodón peinado e hilado en anillos y un 10% de poliéster`,
        imagen: 'images/camisa_surf.webp',
        categoria: 'Camisetas',
        talla: 'L',
        precio: 13.99
      },
      {
        nombre: 'Camiseta basica',
        descripcion: 'Esta camiseta premium unisex tiene un tacto suave y ligero y las dosis justas de elasticidad. Su corte cómodo y unisex favorece a cualquiera. Y no lo decimos nosotros: es una de las favoritas de nuestros clientes. ¡Seguro que pronto también será la tuya!',
        imagen: 'images/camiseta_roja.webp',
        categoria: 'Camisetas',
        talla: 'M',
        precio: 11.99
      },
      {
        nombre: 'Gorra trucker retro',
        descripcion: ' Tiene un ajuste clásico con una parte trasera de rejilla, y es una buena candidata a convertirse en tu favorita.',
        imagen: 'images/gorra_negra.webp',
        categoria: 'Accesorios',
        talla: 'XL',
        precio: 15.13
      },
      {
        nombre: 'Leggins all over hombre',
        descripcion: 'Estos leggins all over para hombre se han fabricado con un material supersuave y elástico que es resistente y cómodo. Su diseño entallado y el refuerzo delantero los hace perfectos para diferentes actividades, y se pueden llevar solos o debajo de pantalones cortos.',
        imagen: 'imagen/pantalon-azul.webp',
        categoria: 'Pantalones',
        talla: 'XS',
        precio: 34.88
      },
      {
        nombre: 'Pantalon Deportivo',
        descripcion: 'Estos pantalones de chándal unisex con impresión all over son una alternativa trendy a la ropa deportiva y son ideales para un outfit urbano. Su tejido ligero y resistente al agua le aporta comodidad en días ventosos y lluviosos, mientras que el forro de malla garantiza una buena transpirabilidad. ',
        imagen: 'images/pantalon-blanco.webp',
        categoria: 'Pantalones',
        talla: 'L',
        precio: 33.89
      },
      {
        nombre: 'Camiseta de algodón',
        descripcion: 'Las riñoneras son el accesorio perfecto para los más atrevidos. Esta riñonera tiene el tamaño perfecto y todo lo que necesitas, incluyendo un bolsillo interior y una cinta regulable. Ideal para turistas, amantes de los festivales y los que siempre van a la última',
        imagen: 'images/riñonera.webp',
        categoria: 'Accesorios',
        talla: 'M',
        precio: 15.99
      },
      {
        nombre: 'Zapatillas de lona caña',
        descripcion: 'Estampadas y hechas a mano, estas zapatillas de lona de caña alta tienen un estilo clásico, retro y muy versátil para tus looks y los de tus clientes. Para que tu marca no pase desapercibida, pon tu logo en la caja, la plantilla y la lengüeta. ',
        imagen: 'images/zapatos-cuello-alto.webp',
        categoria: 'Zapatos',
        talla: 'L',
        precio: 29.99
      },
      {
        nombre: 'Zapatillas azules',
        descripcion: ` Exterior en lona de poliéster 100%
        Suela exterior de goma de etilvinilacetato (goma EVA)
        Forro transpirable
        Puntera de piel sintética
        Plantilla extraíble
        Borde acolchado, cordones en la parte delantera
        Producto base procedente de China`,
        imagen: 'images/zapatos-azules.webp',
        categoria: 'Zapatos',
        talla: 'L',
        precio: 39.99
      },
      {
        nombre: 'Zapatillas de lona caña alta hombre',
        descripcion: `¡El calzado que llevamos dice tanto de nuestro estilo de vida y de nuestra personalidad! Estampadas y hechas a mano, estas zapatillas de lona de caña alta tienen un estilo clásico, retro y muy versátil para tus looks y los de tus clientes. Para que tu marca no pase desapercibida, pon tu logo en la caja, la plantilla y la lengüeta.`,
        imagen: 'images/zapatos.webp',
        categoria: 'Zapatos',
        talla: 'XS',
        precio: 50.52 
      }
    ]);
    console.log('Productos creados correctamente');
  } catch (error) {
    console.error('Error al crear productos:', error);
  }
};



