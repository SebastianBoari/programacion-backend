// Hands on Lab

// Creación de una clase contador

// ¿Cómo lo hacemos? Se creará una clase que permitirá llevar cuentas individuales según cada responsable.

// Definir clase Contador
// La clase se creará con un nombre, representando al responsable del contador.
// El contador debe inicializarse en 0
// Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.

// Definir el método getResponsable, el cual debe devolver el responsable de dicho contador.
// Definir el método contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global.
// Definir el método getCuentaIndividual, el cual debe devolver sólo la cuenta individual del contador.
// Definir el método getCuentaGlobal, el cual debe devolver la variable estática con el conteo global.
// Realizar prueba de individualidad entre las instancias.


class Counter{
    constructor(owner){
        this.owner = owner;
        this.ownCounter = 0;
    };

    // Individual
    getResponsable = () => {
        console.log(this.owner);
    };
    getOwnCounter = () =>{
        console.log(this.ownCounter);
    };
    addOwnCounter = () =>{
        this.ownCounter = this.ownCounter + 1;
    };
    subOwnCounter = () =>{
        this.ownCounter = this.ownCounter - 1;
    };
    resetOwnCounter = () => {
        this.ownCounter = 0;
    };
    
    // Global
    static globalCounter = 0;

    getGlobalCounter = () =>{
        console.log(Counter.globalCounter);
    };
    addGlobalCounter = () =>{
        Counter.globalCounter =  Counter.globalCounter + 1;
    };
    subGlobalCounter = () =>{
        Counter.globalCounter = Counter.globalCounter - 1;
    };
    resetGlobalCounter = () => {
        Counter.globalCounter = 0;
    };

    // Simetrico
    getGlobalAndOwnCounter = () =>{
        console.log(Counter.globalCounter);
        console.log(this.ownCounter);
    };
    addGlobalAndOwnCounter = () =>{
        Counter.globalCounter =  Counter.globalCounter + 1;
        this.ownCounter = this.ownCounter + 1;
    };
}

let contador1 = new Counter("Lucas Martinez");
let contador2 = new Counter("Martina Rodriguez");

contador1.getResponsable();
contador2.getResponsable();

contador1.addGlobalAndOwnCounter();
contador1.getGlobalAndOwnCounter();
contador1.addOwnCounter();
contador1.getOwnCounter();
contador2.getOwnCounter();