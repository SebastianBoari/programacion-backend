const form = document.getElementById('petForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const petName = document.getElementById('petName').value
    const petType = document.getElementById('petType').value

    const pet = {
        petName: petName,
        petType: petType
    }

    fetch('/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    })
})