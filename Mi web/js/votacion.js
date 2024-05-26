document.addEventListener("DOMContentLoaded", function() {
    cargarCategorias();
});

function cargarCategorias() {
    const form = document.getElementById('votacionForm');
    db.collection("categorias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const categoria = doc.data().nombre;
            const nominados = doc.data().nominados;
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('form-group');
            const label = document.createElement('label');
            label.textContent = categoria;
            categoryDiv.appendChild(label);

            nominados.forEach((nominado, index) => {
                const div = document.createElement('div');
                div.classList.add('form-check');
                const input = document.createElement('input');
                input.classList.add('form-check-input');
                input.type = 'radio';
                input.name = categoria;
                input.id = `${categoria}-${index}`;
                input.value = nominado;
                const label = document.createElement('label');
                label.classList.add('form-check-label');
                label.htmlFor = input.id;
                label.textContent = nominado;

                div.appendChild(input);
                div.appendChild(label);
                categoryDiv.appendChild(div);
            });

            form.appendChild(categoryDiv);
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

function enviarVotos() {
    const form = document.getElementById('votacionForm');
    const votos = {};
    
    new FormData(form).forEach((value, key) => {
        votos[key] = value;
    });

    db.collection("votos").add(votos)
    .then((docRef) => {
        console.log("Votos registrados con ID: ", docRef.id);
        alert("¡Gracias por votar!");
        // Opcionalmente, redirigir a otra página o mostrar un mensaje de confirmación
    })
    .catch((error) => {
        console.error("Error registrando votos: ", error);
    });
}