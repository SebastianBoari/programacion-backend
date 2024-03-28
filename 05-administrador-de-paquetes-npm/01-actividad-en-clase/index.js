/* 
 Actividad en clase - Calculadora de Edad

Realizar un programa que utilice la  dependencia momentjs  (deberá instalarse por npm install).

- Debe contar con una variable que almacene la fecha actual (utilizar moment())

- Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).

- Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());

- Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()

- Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa.
*/


import moment from 'moment'

class AgeCalculator {

    #currentDate
    #birth

    constructor(dateOfBirth) {
        this.#currentDate = moment().locale('es')
        this.#birth = moment(dateOfBirth, 'YYYY-MM-DD')

        if (!this.#birth.isValid()) {
            throw new Error('Invalid date of birth.')
        }
    }

    getDaysSinceBirth() {
        return this.#currentDate.diff(this.#birth, 'days')
    }
}


const ageCalculator = new AgeCalculator('1998-07-01')

console.log(`Han pasado ${ageCalculator.getDaysSinceBirth()} días.`)
