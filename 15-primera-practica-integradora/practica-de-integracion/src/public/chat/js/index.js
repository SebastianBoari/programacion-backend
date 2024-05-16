const socket = io()

socket.on('history', (data) => {
    const historyContainer = document.getElementById('chat-history')

    data.forEach((element) => {
        historyContainer.innerHTML += `
        <div>
            <h4>${element.user}</h4>
            <p>${element.message}</p>
        </div>
    `
    })
})

socket.on('message', (data) => {
    const historyContainer = document.getElementById('chat-history')

    historyContainer.innerHTML += `
    <div>
        <h4>${data.user}</h4>
        <p>${data.message}</p>
    </div>
    `
})

const form = document.getElementById('chat-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const message = document.getElementById('chat-textarea').value

    const newMessage = {
        message: message
    }
    
    socket.emit('newMessage', newMessage)

    form.reset()
})
