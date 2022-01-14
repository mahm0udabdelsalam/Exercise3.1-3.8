const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

// Exercise 3.7
app.use(morgan('tiny'))


// Exercise 3.8
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

persons = [
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

// Exercise 3.1
app.get('/', (req,res) => {
    res.send("<h1>Hello Fomr the Other Side</h1>")
})


app.get('/api/persons', (req,res) => {
    res.json(persons)
})

// Exercise 3.2
app.get('/info', (req,res) => {
    date = new Date()
    res.send("<h1>PhoneBook has info for " +
    persons.length +
    " people</h1>" +
    "<br><h2>" +
    date +
    "</h2>"
    )
})



// Exercise 3.3
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})


// Exercise 3.4
app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})



// Exercise 3.4
const generateID= () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }
    if (!body) {
        return res.status(400).json({ 
        error: 'content missing' 
        })
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ 
        error: 'name must be unique' 
        })
    }

    persons = persons.concat(person)
    res.json(person)
})

app.listen(3000)