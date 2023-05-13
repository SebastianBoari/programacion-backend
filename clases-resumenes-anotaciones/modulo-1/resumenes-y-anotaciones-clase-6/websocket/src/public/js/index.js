const socket = io();

// En el servidor el socket esta esperando un evento con el ID "message"
// Para enviar un mensaje desde el cliente hacia el servidor o viceversa utilizaremos la siguiente sintaxis:
// socket.emit('id', mensaje a enviar);
socket.emit('message', 'Soy un usuario');

socket.on('evento_para_socket_individual', (data) => {
    console.log(data);
});

socket.on('evento_para_todos_menos_el_socket_actual', (data) => {
    console.log(data);
});

socket.ond('evento_para_todos', (data) => {
    console.log(data);
});