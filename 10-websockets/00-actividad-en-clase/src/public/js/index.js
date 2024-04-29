const socket = io()
const historyContainer = document.getElementById('history')

socket.on('history', (history) => {
    const historyParsed = JSON.parse(history)

    historyContainer.innerHTML = ''

    historyParsed.forEach((message) => {
        historyContainer.innerHTML += `
            <div>
                <p>Socket ID: ${message.socketId}</p>
                <p>Mensaje: ${message.message}</p>
            </div>
        `
    })
})

const messenger = document.getElementById('messenger')
messenger.addEventListener('submit', (event) => {
    event.preventDefault()

    const messengerMessage = document.getElementById('messenger-message').value

    const message = { socketId: socket.id, message: messengerMessage }

    socket.emit('message', message)
})


