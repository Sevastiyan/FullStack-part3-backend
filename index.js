const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response-body'))
morgan.token('response-body', function (request, response) { return JSON.stringify(request.body) })

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
  });

app.get('/api/persons', (request, response) => { 
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log('id: ', id);
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
});

app.get('/info', (request, response) => {
    const message = `Phonebook has info for ${persons.length} people.`
    const date = new Date().toISOString()

    response.send(`<h1>Phonebook Info</h1><p>${message}</p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => { 
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

})


app.post('/api/persons/', (request, response, next) => { 
    const body = request.body
    const name = body.name
    const number = body.number


    if (!name || !number) {
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }

    if (persons.find(p => p.name === name)) { 
        return response.status(400).json({ 
            error: 'name already exists' 
          })
    }
    
    const id = Math.floor(Math.random() * 1000)

    const person = {
        id: id,
        name: body.name ? body.name : '',
        number: body.number ? body.number : '', 
    }

    persons = persons.concat(person)

    response.status(200).json(person)
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
