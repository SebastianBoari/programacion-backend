const form = document.getElementById('petForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputFile = document.getElementById('petFile')
    const file = inputFile.files[0]

    const formData = new FormData()
    formData.append('image', file)

    fetch('/api/pets', {
        method: 'POST',
        body: formData
    })
})