document.addEventListener("DOMContentLoaded", function () {
    obtenerPosts();
});

function obtenerPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => mostrarPosts(posts.slice(0, 20)));
}

function mostrarPosts(posts) {
    const contenedorPosts = document.getElementById('contenedorPosts');

    posts.forEach(post => {
        const tarjetaPost = crearTarjetaPost(post);
        contenedorPosts.appendChild(tarjetaPost);
    });
}

function crearTarjetaPost(post) {
    const tarjetaPost = document.createElement('div');
    tarjetaPost.className = 'tarjeta-post';
    tarjetaPost.id = `post-${post.id}`;

    const titulo = document.createElement('h3');
    titulo.textContent = post.title;

    const contenido = document.createElement('p');
    contenido.textContent = post.body;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarPost(post.id));

    tarjetaPost.appendChild(titulo);
    tarjetaPost.appendChild(contenido);
    tarjetaPost.appendChild(botonEliminar);

    return tarjetaPost;
}

function eliminarPost(postId) {
    const contenedorPosts = document.getElementById('contenedorPosts');
    const tarjetaPost = document.getElementById(`post-${postId}`);

    if (tarjetaPost) {
        contenedorPosts.removeChild(tarjetaPost);
    }
}

function limpiarLista() {
    const contenedorPosts = document.getElementById('contenedorPosts');
    while (contenedorPosts.firstChild) {
        contenedorPosts.removeChild(contenedorPosts.firstChild);
    }
}
