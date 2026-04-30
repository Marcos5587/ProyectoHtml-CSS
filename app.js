
document.addEventListener("DOMContentLoaded", () => {
  cargarNoticias();

  const boton = document.querySelector("#bottonDestacar");
  boton.addEventListener("click", destacarNoticias);
});

const cargarNoticias = async () => {
  try {
    const respuesta = await fetch("noticias.json");

    if (!respuesta.ok) {
      throw new Error("Error al cargar el JSON");
    }

    const noticias = await respuesta.json();

    escribirNoticias(noticias);

  } catch (error) {
    console.error(error);
  }
};

const escribirNoticias = (noticias) => {
  const contenedor = document.querySelector("#contenedorNoticias");

  contenedor.innerHTML = "";

  noticias.forEach(noticia => {

    const article = document.createElement("article");

    article.setAttribute("data-importante", noticia.importante);

    article.innerHTML = 
    ` <header>
        <h4>${noticia.titulo}</h4>
        <p>Publicado el ${noticia.fecha} | Categoría: ${noticia.categoria}</p>
      </header>

      <p>${noticia.contenido}</p>

      <figure>
        <img src="${noticia.images}" alt="${noticia.titulo}">
      </figure>

      <footer>
        <p>ID noticia: ${noticia.id}</p>
      </footer> `;

    contenedor.appendChild(article);
  });
};

const destacarNoticias = () => {
  const articulos = document.querySelectorAll("#contenedorNoticias article");

  articulos.forEach(article => {
    const esImportante = article.getAttribute("data-importante") === "true";

    if (esImportante) {
      article.classList.toggle("noticia-destacada");
    }
  });
};