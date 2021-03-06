function getGeneros () {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ejemplos-dc1c1.firebaseio.com/generos.json');

    xhr.addEventListener('readystatechange', () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        const generosConIds = JSON.parse(xhr.responseText);
        // pintarDesplegable(generosConIds);
        resolve(generosConIds)
      }
    })

    xhr.send();

  });
}

function pintarDesplegable(opciones) {
  let desplegable = document.getElementById('desplegable-generos');
  let opcionesHTML = '';

  for (let id in opciones) {
    opcionesHTML += `<option value="${opciones[id]}">${opciones[id]}</option>`;
  }

  desplegable.innerHTML = opcionesHTML;
}

getGeneros().then((generos) => {
  pintarDesplegable(generos);
});

function getDatosForm() {
  let pelicula = document.getElementById('input-pelicula').value.trim();
  let genero = document.getElementById('desplegable-generos').value.trim();
  return {
    pelicula: pelicula,
    genero: genero
  }
}

let btnGuardar = document.getElementById('btn-guardar')
btnGuardar.addEventListener('click', (event) => {
  event.preventDefault();

  let {pelicula, genero} = getDatosForm();

  if (pelicula && genero) {
    savePelicula(genero, pelicula)
      .then(() => {
        Swal.fire({
          text: 'Pelicula guardada correctamente...',
          type: 'success'
        })
      });
  }
})

let btnRedirect = document.getElementById('btn-guardar-redirect');
btnRedirect.addEventListener('click', () => {
  event.preventDefault();

  let {pelicula, genero} = getDatosForm();

  if (pelicula && genero) {
    savePelicula(genero, pelicula)
      .then(() => {
        Swal.fire({
          text: 'Pelicula guardada correctamente...',
          type: 'success'
        }).then(() => {
          location.href = 'http://localhost:8080/index.html';
        })
        // Aquí no se pone porque cambia la página antes de pulsar el botón del modal.
        // location.href = 'http://localhost:8080/index.html';
      });
  }
});

// savePelicula().then(() => {
//   // Redirect
// })

function savePelicula(genero, pelicula) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://ejemplos-dc1c1.firebaseio.com/peliculas/${genero}.json`);

    xhr.addEventListener('readystatechange', () => {
      if (xhr.status === 200 && xhr.readyState === 4) {
        // Swal.fire({
        //   text: 'Pelicula guardada correctamente...',
        //   type: 'success'
        // })
        resolve();
      }
    })

    xhr.send(JSON.stringify(pelicula));

  })
}