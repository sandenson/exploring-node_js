import express from "express"
import data from './data/mock.json' assert { type: 'json' }

const app = express()

const PORT = 3000

// Using the public folder at the root of the project
app.use(express.static('public'))

// Using the images folder at the rout /images
app.use('/images', express.static('images'))

// Using express.json and express.urlencoded
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GET
app.get('/', (req, res) => {
    res.json(data)
})

// POST - express.json and express.urlencoded
app.post('/item', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

// GET - redirect method
app.get('/redirect', (req, res) => {
    res.redirect('http://www.linkedin.com/in/luiz-sandes')
})

// GET - download method
app.get('/download', (req, res) => {
    res.download('data/mock.json')
})

app.route('/class')
    .get((req, res) => {
        // res.send('Retrieve class info')
        throw new Error()
    })
    .post((req, res) => {
        res.send('Create class info')
    })
    .put((req, res) => {
        res.send('Update class info')
    })
    .delete((req, res) => {
        res.send('Delete class info')
    })


// GET with next
app.get('/next', (req, res, next) => {
    console.log('The response will be sent by the next function')
    next()
}, (req, res) => {
    res.send('I just set up a rout with a second callback')
})

// GET with routing parameters
app.get('/class/:id', (req, res) => {
    // Middleware: Access the routing parameters
    const studentId = +req.params.id
    const student = data.find(({ id }) => studentId === id)
    // Everything above this line is middleware

    res.send(student)
})

// POST
app.post('/create', (req, res) => {
    res.send('This is a POST request at /create')
})

// PUT
app.put('/edit', (req, res) => {
    res.send('This is a PUT request at /edit')
})

// DELETE
app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at /delete')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something is broken')
})

app.listen(PORT, () => {
    console.info(`The server is running on port ${PORT}`)
})
