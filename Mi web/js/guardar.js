function guardar() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;

    if (nombre === "" || apellido === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    db.collection("users").add({
        first: nombre,
        last: apellido,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // Redirigir a la página de votación
        window.location.href = "votacion.html";
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}