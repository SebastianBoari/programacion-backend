// La función listNumbers verifica si los argumentos son números. Si no lo son, muestra un mensaje de error y termina el programa. Además, se registra un listener para el evento 'exit' que muestra un mensaje si el programa termina por datos incorrectos.

function listNumbers(...numbers) {
    // Filtra los argumentos no numéricos
    const invalidParams = numbers.filter((num) => typeof num !== 'number');
    
    // Si hay argumentos no numéricos, muestra un mensaje de error y finaliza el proceso
    if (invalidParams.length > 0) {
        console.error('Invalid parameters:', invalidParams.map((param) => typeof param));
        process.exit(-4);
    };
    
    // Si todos los argumentos son numéricos, muestra la lista de números
    console.log('Lista de números:', numbers);
};

// Listener para el evento 'exit' de process
process.on('exit', (code) => {
    // Si el código de salida es -4, muestra un mensaje indicando la finalización por argumentación inválida
    if (code === -4) {
        console.log('Proceso finalizado por argumentación inválida en una función');
    };
});

// Ejemplo de uso
listNumbers(1, 2, 'a', true);