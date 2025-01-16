const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('obj', (req, res) => JSON.stringify(req.body) )

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj'));


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const currentDate = new Date(); // 获取当前日期和时间
    const formattedDate = currentDate.toString(); // 格式化日期
    response.send(`
        <p>The phonebook has info for ${persons.length} people</p>
        <p>${formattedDate}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (!person) {
        return response.status(404).end()
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = () => {

    return String(Math.floor(Math.random() * 1000000))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Name or number is missing"
        });
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: "Name must be unique"
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})