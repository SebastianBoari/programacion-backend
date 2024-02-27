class TicketManager {
    #basePriceOfGain = 1.15
    static eventId = 0

    constructor() {
        this.events = []
    }

    getEvents = () => {
        return this.events || 'No events yet.'
    }

    addEvent = (name, location, price, capacity, date) => {

        const defaultDate = new Date().toLocaleString()

        const newEvent = {
            id: TicketManager.eventId++,
            participants: [],
            name: name,
            location: location,
            price: price * this.#basePriceOfGain,
            capacity: capacity || 50,
            date: date || defaultDate
        }

        this.events.push(newEvent)
    }

    addUser = (eventId, userId) => {
        const findEvent = this.events.find((event) => {
            return event.id === eventId
        })

        if (!findEvent) {
            return 'ERROR: Event not exists.'
        }

        if (findEvent.participants.includes(userId)) {
            return 'ERROR: User already exists.'
        }

        findEvent.participants.push(userId)

        return findEvent
    }

    startTour = (eventId, newLocation, newDate) => {
        const defaultDate = new Date().toLocaleString()

        const findEvent = this.events.find((event) => {
            return event.id === eventId
        })

        if (!findEvent) {
            return 'ERROR: Event not exists.'
        }

        let { name, price, capacity } = findEvent

        const newEvent = {
            id: TicketManager.eventId++,
            participants: [],
            name: name,
            location: newLocation,
            price: price,
            capacity: capacity,
            date: newDate || defaultDate
        }

        this.events.push(newEvent)

        return newEvent
    }
}


// TESTS
const ticketManager = new TicketManager()

console.log(ticketManager.getEvents())

ticketManager.addEvent('Shakira', 'Medellin', 60, 9000, '16-12-25')

ticketManager.addEvent('Taylor Swift', 'Ireland', 194, 16000, '10-09-24')

ticketManager.addEvent('Airbag', 'Cordoba', 52, 5000, '07-08-26')

ticketManager.addEvent('Divididos', 'Santiago de Chile', 24)

console.log(ticketManager.addUser(0, 'Carlos Juarez')) // success findEvent
console.log(ticketManager.addUser(0, 'Carlos Juarez')) // ERROR: Event not exists
console.log(ticketManager.addUser(2, 'Carlos Juarez')) // ERROR: User already exists

console.log(ticketManager.startTour(0))