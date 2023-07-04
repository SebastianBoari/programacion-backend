const formulario = document.getElementById("form");


formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const body = { 
        email, 
        password
    };

    const result = await fetch("/jwt/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await result.json();

    console.log(response);

    formulario.reset();
});

const getUserInfo = document.getElementById("getUserInfo");

getUserInfo.addEventListener("click", async () => {
    try{
        const result = await fetch("/jwt/private", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const response = await result.json();

        console.log(response);
    } catch (err){
        console.error(err);
    };
});