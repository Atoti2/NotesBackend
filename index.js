require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
morgan.token('body', req => {
    return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url - :total-time ms :body '))
app.use(cors())


const Note = require('./models/note')

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  Note.findByIdAndUpdate(request.params.id,
     { content, important },
     { new: true, runValidators: true, context: "query" })
  .then(updatedNote => response.json(updatedNote))
  .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => { 
    const body = request.body
    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



// let people = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// app.get('/api/persons', (request, response) => {
//     response.json(people)
// })

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     const person = people.find(p => p.id === id)

//     if(person){
//         response.json(person)
//     }else{
//         response.status(404).end()
//     }
// })

// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     people.filter(p => p.id !== id)
//     response.status(204).end()    
// })

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     if (!body.name || !body.number) {
//         return response.status(400).json({ 
//             error: 'name or number is missing' 
//         })
//     }
//     const isAlreadyAdded = people.find((person) => person.name === body.name)

//     if(!isAlreadyAdded){
//         const person = {
//             id: Math.floor(Math.random() * 1000000) + "",
//             name: body.name,
//             number: body.number
//         }
//         people = people.concat(person)
//         response.json(person)
//     }else{
//         return response.status(400).json({ 
//             error: 'name is already added' 
//         })
         
//     }

    
// })

// app.get('/info', (request, response) => {
//     response.send(`<p>Phonebook has info for ${people.length} people</p><br/> ${new Date().toLocaleTimeString()}`)
// })

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
  
// app.use(unknownEndpoint)

// const PORT = 3001
// app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))


// const express = require('express')
// const app = express()

// app.use(express.json())
