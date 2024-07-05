const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
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
