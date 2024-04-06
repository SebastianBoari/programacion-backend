import express from 'express'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let quote = "La mejor venganza es ser diferente a quien causó el daño."

app.get('/api/frase', (req, res) => {
    res.status(200).json({ frase: quote })
})

app.get('/api/palabras/:pos', (req, res) => {
    let position = Number(req.params.pos)

    const splittedQuote = quote.split(' ')

    if (position <= 0) return res.status(400).json({ error: "Por favor, ingrese un valor mayor a 0." })

    res.status(200).json({ palabra: splittedQuote[position - 1] })
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body

    if (!palabra || palabra.length <= 0) return res.status(400).json({ error: "Por favor, ingrese una palabra." })

    const splittedQuote = quote.split(' ')

    splittedQuote.push(palabra.palabra)

    const lengthOfSplittedQuote = splittedQuote.length

    res.status(200).json({ agregada: palabra, pos: lengthOfSplittedQuote })
})

app.put('/api/palabras/:pos', (req, res) => {


})

app.delete('/api/palabras/:pos', (req, res) => {

})


app.listen(port, () => console.log(`Listening on port ${port}`))