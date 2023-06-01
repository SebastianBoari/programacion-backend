const form = document.getElementById('form');
const userNameInput = document.getElementById('userNameInput');
const userEmailInput = document.getElementById('userEmailInput');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataToSend = {
        userName: userNameInput.value,
        userEmail: userEmailInput.value
    };

    try {
        const response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        
        if(response.ok){
            form.reset();
            alert('Recibimos con exito tu informacion');
        }else{
            alert('Error en la solicitud');
        };

    }catch(error){
        alert(error);
    };
});
