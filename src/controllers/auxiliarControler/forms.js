const NewForm=()=>{
    let html =`
    <form class="max-w-sm mx-auto" action="/dashboard" method="POST">
  <div class="mb-5">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
    <input type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="mb-5">
    <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
    <textarea id="descripcion" name="descripcion" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción del producto" required></textarea>
  </div>
  <div class="mb-5">
    <label for="imagen" class="form-label">URL de la Imagen</label>
    <input type="url" class="form-control" id="imagen" name="imagen" required>
  </div>
  <div class="mb-5">
    <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
    <select id="categoria" name="categoria" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="">Seleccione una categoría</option>
      <option value="Camisetas">Camisetas</option>
      <option value="Pantalones">Pantalones</option>
      <option value="Zapatos">Zapatos</option>
      <option value="Accesorios">Accesorios</option>
    </select>
  </div>
  <div class="mb-5">
    <label for="talla" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Talla</label>
    <select id="talla" name="talla" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="">Seleccione una talla</option>
      <option value="XS">XS</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
  </div>
  <div class="mb-5">
    <label for="precio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
    <input type="number" id="precio" name="precio" min="0" step="0.01" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar nuevo producto</button>
</form>`
;
 return html;
}

const formEdit=(product)=>{
    let html = `
<form class="max-w-sm mx-auto" action="/dashboard/${product._id}" method="POST">
  <div class="mb-5">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
    <input type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${product.nombre}" required />
  </div>
  <div class="mb-5">
    <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
    <textarea id="descripcion" name="descripcion" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción del producto" required>${product.descripcion}</textarea>
  </div>
  <div class="mb-5">
    <label for="imagen" class="form-label">URL de la Imagen</label>
    <input type="url" class="form-control" id="imagen" name="imagen" value="${product.imagen}" required>
  </div>
  <div class="mb-5">
    <label for="categoria" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
    <select id="categoria" name="categoria" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="">Seleccione una categoría</option>
      <option value="Camisetas" ${product.categoria === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
      <option value="Pantalones" ${product.categoria === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
      <option value="Zapatos" ${product.categoria === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
      <option value="Accesorios" ${product.categoria === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
    </select>
  </div>
  <div class="mb-5">
    <label for="talla" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Talla</label>
    <select id="talla" name="talla" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
      <option value="">Seleccione una talla</option>
      <option value="XS" ${product.talla === 'XS' ? 'selected' : ''}>XS</option>
      <option value="S" ${product.talla === 'S' ? 'selected' : ''}>S</option>
      <option value="M" ${product.talla === 'M' ? 'selected' : ''}>M</option>
      <option value="L" ${product.talla === 'L' ? 'selected' : ''}>L</option>
      <option value="XL" ${product.talla === 'XL' ? 'selected' : ''}>XL</option>
    </select>
  </div>
  <div class="mb-5">
    <label for="precio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
    <input type="number" id="precio" name="precio" min="0" step="0.01" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${product.precio}" required />
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Actualizar producto</button>
</form>
`;
return html;
}

module.exports={NewForm,formEdit};