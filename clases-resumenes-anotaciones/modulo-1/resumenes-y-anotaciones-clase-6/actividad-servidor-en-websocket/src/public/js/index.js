const socket = io();

// Listener
const form = document.getElementById('form');
const inputTextArea = document.getElementById('textArea');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentMessage = inputTextArea.value;
   
    if(currentMessage.length > 0){
        socket.emit('message', {
            user: socket.id,
            message: currentMessage,
        });
    };

    form.reset();
});

const historyContainer = document.getElementById('history');

socket.on('history', (data) => {
    data.forEach((msg) => {
        let currentMsg = `<div class="msg"><h4>${msg.user}:</h4><p>${msg.message}</p></div>`;

        historyContainer.innerHTML += currentMsg;
    });
})

socket.on('currentMessage', (msg) => {
    let currentMsg = `<div class="msg"><h4>${msg.user}: </h4><p>${msg.message}</p></div>`;

    historyContainer.innerHTML += currentMsg;
});


