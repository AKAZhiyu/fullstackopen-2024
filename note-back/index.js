const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())



let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    // response.json(note)
    if (note) {
        response.json(note)
    } else {
        response.status(400).end('Current id does not match any')
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes.filter(note => note.id !== id)
    response.status(204).end()
})


const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0

    return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

// app.put('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const body = request.body
//     const noteIndex = notes.findIndex(note => note.id === id)

//     if (noteIndex === -1) {
//         return response.status(404).json({
//             error: 'Note not found'
//         })
//     }
//     const updatedNote = {
//         id,
//         content: body.content || notes[noteIndex].content,  // 保持原有内容，除非传入新的内容
//         important: body.important !== undefined ? body.important : notes[noteIndex].important  // 如果没传则保持原值
//     }
//     notes[noteIndex] = updatedNote
//     response.json(updatedNote)
// })

// const PORT = 3001
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})