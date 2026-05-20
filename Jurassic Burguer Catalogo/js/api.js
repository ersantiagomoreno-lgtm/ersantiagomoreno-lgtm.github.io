document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("productGrid");
  const buscador = document.getElementById("searchInput");

  let comidas = [];

 
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=burger')
    .then(res => res.json())
    .then(data => {
      comidas = data.meals || []; // evita error si viene vacío
      mostrarProductos(comidas);
    })
    .catch(error => {
      console.error("Error al cargar API:", error);
      grid.innerHTML = "<p>Error cargando productos</p>";
    });

 
  function mostrarProductos(lista) {
    grid.innerHTML = "";

    if (lista.length === 0) {
      grid.innerHTML = "<p>No se encontraron productos</p>";
      return;
    }

    lista.forEach(producto => {
      grid.innerHTML += `
        <div class="product-card" data-category="hamburguesas">
          <h3>${producto.strMeal}</h3>
          <img src="${producto.strMealThumb}" alt="${producto.strMeal}">
          <p><b>Categoría:</b> ${producto.strCategory}</p>
          <p><b>Origen:</b> ${producto.strArea}</p>
          <button onclick="verReceta(\`${producto.strInstructions}\`)">
            Ver receta
          </button>
        </div>
      `;
    });
  }

 
  if (buscador) {
    buscador.addEventListener("input", () => {
      const texto = buscador.value.toLowerCase();

      const filtrados = comidas.filter(p =>
        p.strMeal.toLowerCase().includes(texto)
      );

      mostrarProductos(filtrados);
    });
  }

});

function verReceta(receta) {
  alert(receta);
}
