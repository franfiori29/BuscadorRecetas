let total = 0;

const getInputs = () => {
  let arrInputs = [];
  document.querySelectorAll(".extra").forEach((elem) => {
    if (elem.value != "") {
      arrInputs.push(elem.value.toLowerCase());
    }
  });
  return arrInputs;
};

const crearTarjeta = (titulo, linkImagen, arrayIngredientes, linkReceta) => {
  let nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.setAttribute("class", "tarjeta");

  let elementoTitulo = document.createElement("p");
  elementoTitulo.innerHTML = titulo;
  nuevaTarjeta.appendChild(elementoTitulo);

  let elementoImagen = document.createElement("img");
  elementoImagen.src = linkImagen;
  nuevaTarjeta.appendChild(elementoImagen);

  arrayIngredientes.forEach((ing) => {
    let lineaIngrediente = document.createElement("p");
    lineaIngrediente.innerHTML = ing;
    nuevaTarjeta.appendChild(lineaIngrediente);
  });

  let elementoBoton = document.createElement("a");
  elementoBoton.setAttribute("href", linkReceta);
  elementoBoton.innerHTML = "IR A LA RECETA";

  nuevaTarjeta.appendChild(elementoBoton);
  document.getElementById("container").appendChild(nuevaTarjeta);
};

const getRecipes = () => {
  let inputs = getInputs();
  let URL = `https://test-es.edamam.com/search?app_id=468b6262&app_key=07d4eaa4c84fba51c3307830dcfbef89&from=${total}&to=${
    total + 100
  }&q=${document.getElementById("ingPrincipal").value}`;

  $.ajax({
    url: URL,
    success: function (result) {
      result.hits.forEach((receta) => {
        console.log(receta);
        receta.recipe.ingredientLines.forEach((linea) => {
          let cont = 0;
          let lineaHtml = "";
          for (let inp of inputs) {
            if (linea.includes(inp)) {
              cont++;
            } else break;
          }
          if (cont == inputs.length) {
            crearTarjeta(
              receta.recipe.label,
              receta.recipe.image,
              receta.recipe.ingredientLines,
              receta.recipe.url
            );
          }
        });
      });
    },
  });
};

document.getElementById("agregarExtra").addEventListener("click", () => {
  let nuevoInput = document.createElement("div");
  nuevoInput.innerHTML =
    'Ingrediente extra: <input type="text" class="extra" /><br />';
  document.getElementById("divInputs").appendChild(nuevoInput);
});

document.getElementById("enviar").addEventListener("click", () => {
  getRecipes();

  document.querySelectorAll("img").forEach((imagen) => {
    if (imagen.height < 32) {
      imagen.style.display = "none";
    }
  });
  total += 100;
});
