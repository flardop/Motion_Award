// app.js

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return db.collection('Usuarios').doc(user.uid).set({
                username: username,
                firstName: firstName,
                lastName: lastName,
                age: age,
                phone: phone,
                email: email
            });
        })
        .then(() => {
            alert('Usuario registrado con éxito');
            document.getElementById('registration').style.display = 'none';
            document.getElementById('inicio').style.display = 'block';
        })
        .catch(error => {
            console.error('Error registrando el usuario:', error);
            alert(error.message);
        });
});
