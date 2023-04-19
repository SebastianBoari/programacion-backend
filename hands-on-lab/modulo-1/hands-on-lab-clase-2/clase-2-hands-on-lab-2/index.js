// Hands on Lab

// Calculadora positiva con promesas
// ¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas por promesas y un entorno ASÍNCRONO  donde podremos ponerlas a prueba

// Definir función suma:
// Debe devolver una promesa que se resuelva    siempre que ninguno de los dos sumandos sea 0
// En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.

// Definir función resta:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
// En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
// En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”

// Definir una función multiplicación:
// Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo

// Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos

// Definir la misma función división utilizada en esta clase.

// Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch


// Suma
function suma(a, b) {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) {
            reject("Operacion innecesaria");
        } else {
            resolve(a + b);
        };
    });
};
  

// Resta
function resta(a, b) {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) {
            reject("Operacion invalida");
        } else {
            const result = a - b;

            if (result < 0) {
                reject("La calculadora solo devuelve valores positivos.");
            } else {
                resolve(result);
            };
    
        };
    });
};
  
// Multiplicacion
function multiplicacion(a, b) {
    return new Promise((resolve, reject) => {
        if (a < 0 || b < 0) {
            reject("La calculadora solo devuelve valores positivos.");
        } else {
            resolve(a * b);
        };
    });
};
  

// Division
function division(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("Division por cero");
        } else {
            resolve(a/b);
        };
    });
};


// Calculos
async function calculos() {
    try {
      const sumaResult = await suma(2, 3);
      console.log(`2 + 3 = ${sumaResult}`);
  
      const restaResult = await resta(5, 2);
      console.log(`5 - 2 = ${restaResult}`);
  
      const multiplicacionResult = await multiplicacion(2, 3);
      console.log(`2 * 3 = ${multiplicacionResult}`);
  
      const divisionResult = await division(6, 2);
      console.log(`6 / 2 = ${divisionResult}`);
    } catch (error) {
      console.log(error);
    };
};


// Calculos pero con errores
// Ir sacando los comentarios de a uno para poder ir verificando que se manejen bien los errores de cada operacion.
async function calculosErrores(){
    try {
      //const sumaResult = await suma(0, 3);
      //console.log(`0 + 3 = ${sumaResult}`);
  
      //const restaResult = await resta(5, 100);
      //console.log(`5 - 100 = ${restaResult}`);
  
      //const multiplicacionResult = await multiplicacion(-2, 3);
      //console.log(`-2 * 3 = ${multiplicacionResult}`);
  
      //const divisionResult = await division(6, 0);
      //console.log(`6 / 0 = ${divisionResult}`);
    } catch (error) {
      console.log(error);
    };
};


calculosErrores();
calculos();
