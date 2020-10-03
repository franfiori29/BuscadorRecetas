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

const getRecipes = () => {
  let inputs = getInputs();
  let URL =
    "https://test-es.edamam.com/search?app_id=468b6262&app_key=07d4eaa4c84fba51c3307830dcfbef89&from=" +
    total +
    "&to=" +
    (total + 100) +
    "&q=" +
    document.getElementById("ingPrincipal").value;

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
            let divCreado = document.createElement("div");
            divCreado.setAttribute("class", "tarjeta");
            let nombreReceta = receta.recipe.label;
            let nuevoTitulo = document.createElement("p");
            nuevoTitulo.innerText = nombreReceta;
            divCreado.appendChild(nuevoTitulo);
            receta.recipe.ingredientLines.forEach((agregar) => {
              let nuevaLinea = document.createElement("p");
              nuevaLinea.innerHTML = agregar;
              divCreado.appendChild(nuevaLinea);
            });
            $("#container").append(divCreado);
          }
        });
      });
    },
  });
};

document.getElementById("enviar").addEventListener("click", () => {
  getRecipes();
  total += 100;
  document.getElementById("enviar").innerText = "Más";
});
