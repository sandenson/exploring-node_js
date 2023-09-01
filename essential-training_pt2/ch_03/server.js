import express from "express";
import skiTerms from './ski-terms.json' assert { type: 'json' }
import fs from 'fs'

const app = express()

app.use('/', express.static('./client'))

app.get('/dictionary', (req, res) => {
    res.json(skiTerms)
})

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    if (Object.keys(req.body).length) {
        console.log(req.body)
    }
    next()
})

app.post('/dictionary', express.json(), (req, res) => {
    skiTerms.push(req.body)
    save()
    res.json({
        status: 'success',
        term: req.body,
    })
})

app.delete('/dictionary/:term', (req, res) => {
    const i = skiTerms.findIndex(({ term }) => term === req.params.term)
    if (i > 0) {
        skiTerms.splice(i, 1)
        save()
        res.json({
            status: 'success',
            removed: req.params.term,
            newLength: skiTerms.length,
        })
    } else {
        res.json({
            status: 'success',
            removed: null,
            newLength: skiTerms.length,
        })
    }
})

const save = () => {
    fs.writeFile(
        './ski-terms.json',
        JSON.stringify(skiTerms, null, 2),
        err => {
            if (err) {
                throw err
            }
        }
    )
}

app.listen(3000, () => console.log('ski dictionary running at 3000'))
