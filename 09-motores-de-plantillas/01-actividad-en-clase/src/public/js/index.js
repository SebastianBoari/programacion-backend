const registerForm = document.getElementById("register-form")

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const registerName = document.getElementById("register-name").value
    const registerEmail = document.getElementById("register-email").value
    const registerPassword = document.getElementById("register-password").value

    const user = {
        name: registerName,
        email: registerEmail,
        password: registerPassword
    }

    fetch('http://localhost:8080/api/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            res.json()
        })
        .then((res) => {
            alert('Se ha registrado correctamente!')
        })
})