// Esta función se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función obtenerPosts para cargar y mostrar los posts
    obtenerPosts();
});

// Función para obtener los posts desde una API y mostrarlos
function obtenerPosts() {
    // Realiza una solicitud a la API para obtener los posts
    fetch("https://jsonplaceholder.typicode.com/posts")
        // Procesa la respuesta como JSON
        .then(response => response.json())
        // Una vez que se obtienen los posts, llama a la función mostrarPosts para mostrarlos
        .then(posts => mostrarPosts(posts.slice(0, 20))); // Se muestra un número limitado de posts inicialmente
}

// Función para mostrar los posts en el DOM
function mostrarPosts(posts) {
    // Obtiene el contenedor donde se mostrarán los posts del HTML
    const contenedorPosts = document.getElementById('contenedorPosts');

    // Por cada post, crea una tarjeta de post y la añade al contenedor
    posts.forEach(post => {
        const tarjetaPost = crearTarjetaPost(post);
        contenedorPosts.appendChild(tarjetaPost);
    });
}

// Función para crear una tarjeta de post
function crearTarjetaPost(post) {
    // Crea un elemento div que servirá como tarjeta de post
    const tarjetaPost = document.createElement('div');
    tarjetaPost.className = 'tarjeta-post'; // Aplica una clase CSS para dar estilo a la tarjeta
    tarjetaPost.id = `post-${post.id}`; // Asigna un ID único basado en el ID del post

    // Crea un título h3 y asigna el título del post como su contenido
    const titulo = document.createElement('h3');
    titulo.textContent = post.title;

    // Crea un párrafo y asigna el cuerpo del post como su contenido
    const contenido = document.createElement('p');
    contenido.textContent = post.body;

    // Crea un botón de eliminar y añade un evento para manejar la eliminación del post
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarPost(post.id));

    // Añade los elementos creados a la tarjeta de post
    tarjetaPost.appendChild(titulo);
    tarjetaPost.appendChild(contenido);
    tarjetaPost.appendChild(botonEliminar);

    // Devuelve la tarjeta de post creada
    return tarjetaPost;
}

// Función para eliminar un post
function eliminarPost(postId) {
    // Obtiene el contenedor de posts del HTML
    const contenedorPosts = document.getElementById('contenedorPosts');
    // Obtiene la tarjeta de post específica por su ID
    const tarjetaPost = document.getElementById(`post-${postId}`);

    // Si la tarjeta existe, la elimina del contenedor
    if (tarjetaPost) {
        contenedorPosts.removeChild(tarjetaPost);
        // Muestra un mensaje de confirmación utilizando SweetAlert
        Swal.fire({
            title: "Post eliminado",
            text: "El post ha sido eliminado correctamente.",
            icon: "success"
        });
    }
}

// Función para limpiar la lista de posts en el contenedor
function limpiarLista() {
    const contenedorPosts = document.getElementById('contenedorPosts');
    
    // Elimina todos los elementos hijos del contenedor
    while (contenedorPosts.firstChild) {
        contenedorPosts.removeChild(contenedorPosts.firstChild);
    }

    // Muestra un mensaje de confirmación utilizando SweetAlert
    Swal.fire({
        title: "Se eliminó toda la lista",
        text: "El post ha sido eliminado correctamente",
        icon: "success"
    });
}

// Obtener el formulario y los campos de entrada del usuario
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const lastNameInput = document.getElementById('lastName'); // Agrega el input del apellido
const ageInput = document.getElementById('age'); // Agrega el input de la edad

// Agregar un evento de escucha para el envío del formulario
userForm.addEventListener('submit', function(event) {
    // Prevenir el comportamiento predeterminado del formulario (enviar a una página nueva)
    event.preventDefault();
  
    // Obtener los valores ingresados por el usuario
    const username = usernameInput.value;
    const lastName = lastNameInput.value;
    const age = ageInput.value;
  
    // Guardar los datos en el Local Storage
    localStorage.setItem('username', username);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('age', age);

    // Guardar los datos en el Session Storage
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('age', age);
  
    // Confirmar al usuario que sus datos se han guardado utilizando SweetAlert
    Swal.fire({
        title: "Datos guardados",
        text: "Los datos se han guardado correctamente en el localStorage y sessionStorage",
        icon: "success"
    });
});

// Recuperar los valores guardados en el Local Storage
const savedUsername = localStorage.getItem('username');
const savedLastName = localStorage.getItem('lastName');
const savedAge = localStorage.getItem('age');

// Verificar si se guardaron valores para el nombre de usuario, apellido y edad en el Local Storage
if (savedUsername) {
    console.log('Nombre de usuario guardado:', savedUsername);
} else {
    console.log('No se encontró ningún nombre de usuario guardado.');
}

if (savedLastName) {
    console.log('Apellido guardado:', savedLastName);
} else {
    console.log('No se encontró ningún apellido guardado.');
}

if (savedAge) {
    console.log('Edad guardada:', savedAge);
} else {
    console.log('No se encontró ninguna edad guardada.');
}
