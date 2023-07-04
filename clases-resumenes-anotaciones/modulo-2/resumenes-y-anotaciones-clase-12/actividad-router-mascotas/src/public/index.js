const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const petName = document.getElementById("name").value;
    const petSpecie = document.getElementById("specie").value;

    try{
        await fetch("http://localhost:8080", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"name": petName, "specie": petSpecie})
        });

        form.reset();
    } catch(err){
        alert(`${err}`);
    };

});

const adoptBtn = document.getElementById("adoptPet");

adoptBtn.addEventListener('click', async () => {
    
    const petName = document.getElementById("name").value;

    try{
        const response = await fetch(`http://localhost:8080/${petName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.ok) {
            const data = await response.json();
            alert(`${data.payload.name} ha sido adoptado!`);
        };
        
        form.reset();
    }catch(err){
        alert(`${err}`);
    };
});