const express = require('express');
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Route that sends the user to the index.html.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Route that sends the user to the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body

    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase()

    console.log(newNote)

    db.push(newNote)

    res.json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
    const selectedNote = req.params.id
    // console.log(db)

    for (let i = 0; i < db.length; i++) {

        if (selectedNote === db[i].id) {
            db.splice(i, 1)

            return res.send('Note removed.')
        }
    }

    return res.json(false)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`App listening on PORT ${PORT}.`)
})